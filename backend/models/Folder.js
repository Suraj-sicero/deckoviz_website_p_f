import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Folder = sequelize.define("Folder", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Folder;
