import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const SearchHistory = sequelize.define("SearchHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  query: DataTypes.STRING,
  image: DataTypes.STRING,
}, {
  timestamps: true,
});

export default SearchHistory;
