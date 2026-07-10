import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EnterpriseTemplate = sequelize.define("EnterpriseTemplate", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false, defaultValue: "default-enterprise" },
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: true },
  lastEdited: { type: DataTypes.STRING, allowNull: true },
});

export default EnterpriseTemplate;
