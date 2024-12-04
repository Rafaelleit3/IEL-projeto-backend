const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection"); 

const Image = sequelize.define("Image", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;

