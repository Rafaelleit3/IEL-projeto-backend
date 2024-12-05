import Product from "../models/product.js";
import Category from "../models/category.js";
import Image from "../models/image.js";
import Option from "../models/productoption.js";
import imageDecode from '../utils/imageDecode.js';

export const searchProducts = async (req, res) => {
  try {
    const {
      limit = 12, 
      page = 1, 
      fields, 
      match, 
      category_ids, 
      price_range, 
      option
    } = req.query;
    
    const where = {};
    
    //Query string usada para filtrar o resultado de produtos por um termo que combine com o nome ou descrição do produto
    if (match) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${match}%` } },
        { description: { [Op.iLike]: `%${match}%` } },
      ];
    }

    //Query string usada para filtrar o resultado de produtos pelo ID das categorias
    if (category_ids) {
      const categories = category_ids.split(',').map(id => parseInt(id, 10));
      where['category_ids'] = { [Op.overlap]: categories };
    }

    // Query string para filtrar o resultado de produtos por uma determinada "janela" de preços
    if (price_range) {
      const [minPrice, maxPrice] = price_range.split('-').map(price => parseFloat(price));
      where['price'] = { [Op.between]: [minPrice, maxPrice] };
    }

    // Query string para filtrar o resultado de produtos pelo valor das opções disponíveis
    if (option) {
        Object.keys(option).forEach(optionId => {
          const values = option[optionId].split(',');
          where['options'] = {
            [Op.contains]: [{ id: parseInt(optionId, 10), values }]
          };
        });
      }

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    
    if (isNaN(parsedLimit) || parsedLimit < -1 || parsedLimit === 0) {
      return res.status(400).json({ error: '"limit" deve ser maior que 0 ou -1' });
    }
    if (isNaN(parsedPage) || parsedPage <= 0) {
      return res.status(400).json({ error: '"page" deve ser maior que 0' });
    }
    
    // Quando limit receber -1 a opção de page não tem nenhum efeito
    const offset = parsedLimit !== -1 ? (parsedPage - 1) * parsedLimit : null;

    //Query string para limitar quais campos serão retornados
    const selectedFields = fields ? fields.split(',') : null;

    const { rows: data, count: total } = await Product.findAndCountAll({
      where,
      attributes: selectedFields,
      limit: parsedLimit !== -1 ? parsedLimit : null,
      offset,
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });

    res.json({
      data,
      total,
      limit: parsedLimit,
      page: parsedPage,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar produtos',
      details: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
          include: [
              {
                  model: Category,
                  as: "categories",
                  attributes: ["id", "name"],
                  through: { attributes: [] }, // Remove atributos extras da tabela de associação
              },
              {
                  model: Image,
                  as: "images",
                  attributes: ["id", "url"],
              },
              {
                  model: Option,
                  as: "options",
                  attributes: ["id", "size"],
              },
          ],
      });

      if (!product) {
          return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Adicionar ids das categorias manualmente se necessário
      const categoryIds = product.categories.map((cat) => cat.id);

      const response = {
          id: product.id,
          enabled: product.enabled,
          name: product.name,
          slug: product.slug,
          stock: product.stock,
          description: product.description,
          price: product.price,
          price_with_discount: product.price_with_discount,
          category_ids: categoryIds,
          images: product.images,
          options: product.options,
      };

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).json({
          error: "Erro ao buscar produto",
          details: error.message,
      });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

    if (!name || !slug || !price || !category_ids || !Array.isArray(category_ids)) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando ou inválidos. Verifique os campos "name", "slug", "price", "category_ids".'
      });
    }

    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

    const categories = await Category.findAll({
      where: { id: category_ids }
    });

    await newProduct.setCategories(categories);
    
    // Criação das imagens do produto
    const imagePromises = images.map(async (image) => {
      // Decodifica a imagem base64
      const imageBuffer = imageDecode(image.content, image.fileName); // Passando o nome do arquivo
      // Cria o registro da imagem no banco
      const imageRecord = await Image.create({
        type: image.type,
        content: imageBuffer, // Aqui estamos usando BLOB, mas pode ser um caminho
      });
      // Relaciona a imagem ao produto
      await newProduct.addImage(imageRecord);
    });
    
    await Promise.all(imagePromises);

    // Criação das opções do produto
    const optionPromises = options.map(async (option) => {
      const optionRecord = await Option.create({
        title: option.title,
        shape: option.shape,
        radius: option.radius,
        type: option.type
      });

      if (option.values) {
        await optionRecord.setValues(option.values);
      }

      await newProduct.addOption(optionRecord);
    });

    await Promise.all(optionPromises);

    // Retorna o produto criado com categorias, imagens e opções
    return res.status(201).json({
      message: 'Produto criado com sucesso',
      data: newProduct
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao cadastrar produto',
      details: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const {
          enabled,
          name,
          slug,
          stock,
          description,
          price,
          price_with_discount,
          category_ids,
          images,
          options,
      } = req.body;

      if (!name || !slug) {
          return res.status(400).json({ error: 'Os campos "name" e "slug" são obrigatórios' });
      }

      const product = await Product.findByPk(id);
      if (!product) {
          return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Atualizar os dados do produto
      product.enabled = enabled ?? product.enabled;
      product.name = name;
      product.slug = slug;
      product.stock = stock ?? product.stock;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.price_with_discount = price_with_discount ?? product.price_with_discount;

      await product.save();

      // Atualizar imagens
      if (images) {
          for (const image of images) {
              if (image.deleted) {
                  await Image.destroy({ where: { id: image.id } });
              } else if (image.id) {
                  await Image.update({ content: image.content }, { where: { id: image.id } });
              } else {
                  await Image.create({ product_id: product.id, type: image.type, content: image.content });
              }
          }
      }

      // Atualizar opções
      if (options) {
          for (const option of options) {
              if (option.deleted) {
                  await Option.destroy({ where: { id: option.id } });
              } else if (option.id) {
                  await Option.update(option, { where: { id: option.id } });
              } else {
                  await Option.create({ product_id: product.id, ...option });
              }
          }
      }

      // Atualizar categorias do produto
      if (category_ids) {
          await product.setCategories(category_ids); // Ajuste conforme o relacionamento entre produto e categorias
      }

      return res.status(204).send(); // Retorna 204 sem corpo na resposta
  } catch (error) {
      return res.status(500).json({
          error: 'Erro ao atualizar produto',
          details: error.message,
      });
  }
};

export const deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
          return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Remover as imagens associadas ao produto
      await Image.destroy({ where: { product_id: id } });

      // Remover as opções associadas ao produto
      await Option.destroy({ where: { product_id: id } });

      // Remover o produto
      await Product.destroy({ where: { id } });

      return res.status(204).send(); // Retorna 204 sem corpo
  } catch (error) {
      return res.status(500).json({
          error: 'Erro ao excluir produto',
          details: error.message,
      });
  }
};
