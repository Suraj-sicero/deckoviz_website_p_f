import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  artworkId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  image: DataTypes.STRING,
  size: DataTypes.STRING,
  medium: DataTypes.STRING,
  price: DataTypes.FLOAT,
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: true,
});

export default CartItem;
