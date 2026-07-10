import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EnterpriseProfile = sequelize.define("EnterpriseProfile", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false, defaultValue: "default-enterprise" },
  name: { type: DataTypes.STRING, defaultValue: "The Grand Metropolitan" },
  subtitle: { type: DataTypes.STRING, defaultValue: "Luxury Hotel & Residences" },
  location: { type: DataTypes.STRING, defaultValue: "London, United Kingdom" },
  avatar: { type: DataTypes.STRING, allowNull: true },
  banner: { type: DataTypes.STRING, allowNull: true },
  contactEmail: { type: DataTypes.STRING, allowNull: true },
  contactPhone: { type: DataTypes.STRING, allowNull: true },
  website: { type: DataTypes.STRING, allowNull: true },
  industry: { type: DataTypes.STRING, defaultValue: "Hospitality" },
  about: { type: DataTypes.TEXT, allowNull: true },
});

export default EnterpriseProfile;
