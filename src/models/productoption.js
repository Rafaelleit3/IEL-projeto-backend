const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection"); 

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

module.exports = ProductOption;

