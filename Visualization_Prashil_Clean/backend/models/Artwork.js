import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Artwork = sequelize.define("Artwork", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  artist: DataTypes.STRING,
  artistAvatar: DataTypes.STRING,
  price: DataTypes.FLOAT,
  medium: DataTypes.STRING,
  dimensions: DataTypes.STRING,
  year: DataTypes.STRING,
  category: DataTypes.STRING,
  tags: DataTypes.JSON,
  rating: DataTypes.FLOAT,
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Artwork;
