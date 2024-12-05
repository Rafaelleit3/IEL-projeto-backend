import Category from "./category.js";
import Product from "./product.js";
import Image from "./image.js";
import ProductOption from "./productoption.js";
import ProductCategory from "./productCategory.js";

Category.belongsToMany(Product, {
  through: {
    model: ProductCategory,
  },
  foreignKey: "category_id",
  as: "products", // Alias para acessar os produtos associados à categoria
  constraints: true,
});

Product.belongsToMany(Category, {
  through: {
    model: ProductCategory,
  },
  foreignKey: "product_id",
  as: "categories", // Alias para acessar as categorias associadas ao produto
  constraints: true,
});

// Associações entre Product e Image
Product.hasMany(Image, { foreignKey: "productId" });
Image.belongsTo(Product, { foreignKey: "productId" });

// Associações entre Product e ProductOption
Product.hasMany(ProductOption, { foreignKey: "productId" });
ProductOption.belongsTo(Product, { foreignKey: "productId" });

