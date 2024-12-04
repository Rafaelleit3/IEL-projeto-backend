import Category from "../models/category";

export const searchCategories = async (req, res) => {
    try {
        const {
            limit = 12,
            page = 1,
            fields,
            use_in_menu,
        } = req.query;
 
        
        const where = {};
        //Query string para limitar quais campos serão retornados
        const selectedFields = fields ? fields.split(',') : null;
        
        //Query string para filtrar apenas as categorias que podem aparecer no menu
        if (use_in_menu !== undefined) {
            where.use_in_menu = use_in_menu === 'true';
        }
        
        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);
        
        // Validação dos parâmetros
        if (isNaN(parsedLimit) || parsedLimit < -1 || parsedLimit === 0) {
            return res.status(400).json({ error: '"limit" deve ser maior que 0 ou -1' });
        }

        if (isNaN(parsedPage) || parsedPage <= 0) {
            return res.status(400).json({ error: '"page" deve ser maior que 0' });
        }

        //Quando limit receber -1 a opção de page não tem nenhum efeito no resultado da busca e pode ser omitida da query string
        const offset = parsedLimit !== -1 ? (parsedPage - 1) * parsedLimit : null;

        const { rows: data, count: total } = await Category.findAndCountAll({
            where,
            attributes: selectedFields,
            limit: parsedLimit !== -1 ? parsedLimit : null,
            offset,
        });

        res.json({
            data,
            total,
            limit: parsedLimit,
            page: parsedPage,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias', details: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, slug, use_in_menu = false } = req.body;

        if (!name || !slug) {
            return res.status(400).json({ error: 'Os campos "name" e "slug" são obrigatórios' });
        }

        const newCategory = await Category.create({
            name,
            slug,
            use_in_menu,
        });

        return res.status(201).json({
            message: 'Categoria cadastrada com sucesso',
            data: newCategory,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao cadastrar categoria',
            details: error.message,
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, use_in_menu } = req.body;

        if (!name || !slug) {
            return res.status(400).json({ error: 'Os campos "name" e "slug" são obrigatórios' });
        }

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        await category.update({
            name,
            slug,
            use_in_menu,
        });

        // Responder com 204 No Content sem corpo
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao atualizar categoria',
            details: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        await category.destroy();

        // Responder com 204 No Content sem corpo
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            error: 'Erro ao deletar categoria',
            details: error.message,
        });
    }
};

module.exports = {
    searchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};