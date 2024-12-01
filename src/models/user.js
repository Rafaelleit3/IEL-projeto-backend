const { Model, DataTypes } = require("sequelize");
const connection = require("../config/connection");
const bcrypt = require("bcryptjs");

class User extends Model {
  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async validatePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    timestamps: true, 
  }
);

module.exports = User;

