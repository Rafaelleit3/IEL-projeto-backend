import sequelize from '../config/connection.js';
import Category from './category.js';
import Product from './product.js';
import Image from './image.js';
import ProductOption from './productoption.js';
import User from './user.js';


Category.belongsToMany(Product, {
    through: "ProductCategory",
    foreignKey: "categoryId",
});

Product.belongsToMany(Category, {
    through: "ProductCategory",
    foreignKey: "productId",
});

Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(ProductOption, { foreignKey: 'productId' });
ProductOption.belongsTo(Product, { foreignKey: 'productId' });

Category.belongsToMany(Product, {
    through: "ProductCategory",
    foreignKey: "categoryId",
});

Product.belongsToMany(Category, {
    through: "ProductCategory",
    foreignKey: "productId",
});

Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(ProductOption, { foreignKey: 'productId' });
ProductOption.belongsTo(Product, { foreignKey: 'productId' });


export { sequelize, Category, Product, Image, ProductOption, User };


