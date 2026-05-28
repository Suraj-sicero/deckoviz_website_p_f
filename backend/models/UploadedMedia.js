import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UploadedMedia = sequelize.define("UploadedMedia", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mediaType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "e.g. image/png, application/pdf, video/mp4",
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "Size in bytes",
  },
  isFavorited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default UploadedMedia;
