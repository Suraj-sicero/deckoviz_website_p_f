import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const OrderSummary = sequelize.define("OrderSummary", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productName: DataTypes.STRING,
  productDescription: DataTypes.STRING,
  totalItems: DataTypes.INTEGER,
  subtotal: DataTypes.FLOAT,
  deliveryFees: {
    type: DataTypes.FLOAT,
    defaultValue: 39,
  },
  total: DataTypes.FLOAT,
}, {
  timestamps: true,
});

export default OrderSummary;
