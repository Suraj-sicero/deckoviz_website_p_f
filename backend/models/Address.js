import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  label: DataTypes.STRING,
  phone: DataTypes.STRING,
  street: DataTypes.STRING,
  city: DataTypes.STRING,
  zip: DataTypes.STRING,
  selected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default Address;
