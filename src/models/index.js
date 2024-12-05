import sequelize from '../config/connection.js';
import Category from './category.js';
import Product from './product.js';
import Image from './image.js';
import ProductOption from './productoption.js';
import User from './user.js';
import './associations.js';

export { sequelize, Category, Product, Image, ProductOption, User };
