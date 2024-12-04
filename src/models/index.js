const sequelize = require('../config/connection');
const Category = require('./category');
const Product = require('./product');
const Image = require('./image');
const ProductOption = require('./productoption');
const User = require('./user');


Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Product.hasMany(Image, { foreignKey: 'productId' });
Image.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(ProductOption, { foreignKey: 'productId' });
ProductOption.belongsTo(Product, { foreignKey: 'productId' });


module.exports = { sequelize, Category, Product, Image, ProductOption, User };


