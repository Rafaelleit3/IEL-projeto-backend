import Category from "./category.js";
import Product from "./product.js";
import Image from "./image.js";
import ProductOption from "./productoption.js";

// Associações entre Category e Product
Category.belongsToMany(Product, {
  through: "ProductCategory",
  foreignKey: "categoryId",
  otherKey: "productId",
});

Product.belongsToMany(Category, {
  through: "ProductCategory",
  foreignKey: "productId",
  otherKey: "categoryId",
});

// Associações entre Product e Image
Product.hasMany(Image, { foreignKey: "productId" });
Image.belongsTo(Product, { foreignKey: "productId" });

// Associações entre Product e ProductOption
Product.hasMany(ProductOption, { foreignKey: "productId" });
ProductOption.belongsTo(Product, { foreignKey: "productId" });

