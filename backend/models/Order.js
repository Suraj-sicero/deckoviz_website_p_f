import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  items: DataTypes.JSON,
  subtotal: DataTypes.FLOAT,
  deliveryFees: {
    type: DataTypes.FLOAT,
    defaultValue: 39,
  },
  total: DataTypes.FLOAT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
}, {
  timestamps: true,
});

export default Order;
