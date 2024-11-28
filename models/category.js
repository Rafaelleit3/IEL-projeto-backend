const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");

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

module.exports = Category;


