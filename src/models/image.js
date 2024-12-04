import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js"; 

const Image = sequelize.define("Image", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Image;

