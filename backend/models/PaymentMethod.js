import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const PaymentMethod = sequelize.define("PaymentMethod", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cardHolder: DataTypes.STRING,
  cardNumber: DataTypes.STRING,
  balance: DataTypes.STRING,
  currency: {
    type: DataTypes.STRING,
    defaultValue: "USD",
  },
  status: DataTypes.STRING,
  validThru: DataTypes.STRING,
  type: DataTypes.STRING,
}, {
  timestamps: true,
});

export default PaymentMethod;
