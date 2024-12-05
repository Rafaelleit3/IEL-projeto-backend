import { Model, DataTypes } from "sequelize";
import connection from "../config/connection.js";

class ProductCategory extends Model {}

ProductCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "ProductCategory",
    timestamps: false,
  }
);

export default ProductCategory;
