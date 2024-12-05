import { Model, DataTypes } from "sequelize";
import connection from "../config/connection.js";
import Product from "./product.js";

class Category extends Model {}

Category.init(
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
    sequelize: connection,
    modelName: "Category",
    timestamps: true, 
  }
);


Category.belongsToMany(Product, {
  through: 'ProductCategory',
  foreignKey: 'category_id',
  as: 'products',
});

export default Category;
