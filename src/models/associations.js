import Category from "./category.js";
import Product from "./product.js";

// Associações entre Category e Product
Category.belongsToMany(Product, {
  through: "productCategory",
  foreignKey: "category_id",
  otherKey: "product_id",
});

Product.belongsToMany(Category, {
  through: "productCategory",
  foreignKey: "product_id",
  otherKey: "category_id",
});


// Associações entre Product e Image
Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

// Associações entre Product e ProductOption
Product.hasMany(ProductOption, { foreignKey: 'productId' });
ProductOption.belongsTo(Product, { foreignKey: 'productId' });
