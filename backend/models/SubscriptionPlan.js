import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const SubscriptionPlan = sequelize.define("SubscriptionPlan", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tier: DataTypes.STRING,
  price: DataTypes.STRING,
  period: DataTypes.STRING,
  subtitle: DataTypes.STRING,
  description: DataTypes.TEXT,
  features: DataTypes.JSON,
  featuresLabel: DataTypes.STRING,
  highlighted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  buttonStyle: {
    type: DataTypes.STRING,
    defaultValue: "outlined",
  },
}, {
  timestamps: true,
});

export default SubscriptionPlan;
