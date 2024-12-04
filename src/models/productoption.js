import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js"; 

const ProductOption = sequelize.define("ProductOption", {
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  additionalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

export default ProductOption;

