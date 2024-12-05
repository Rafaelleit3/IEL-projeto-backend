import connection from "../config/connection.js";
import Product from "./product.js";

const Category = connection.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,  
      defaultValue: false,  
    },
  },
  {
    timestamps: true,
  }
);

Category.belongsToMany(Product, {
  through: 'ProductCategory',
  foreignKey: 'category_id',
  as: 'products',
});

export default Category;
