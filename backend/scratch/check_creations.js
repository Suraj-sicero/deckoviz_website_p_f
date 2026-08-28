import { sequelize } from "../config/db.js";
import pkg from "sequelize";
const { DataTypes } = pkg;

// Define model inline to avoid import issues
const SongVisualsCreation = sequelize.define("SongVisualsCreation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lyrics: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  n: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  musicStyle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artStyle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transitionEffect: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "SongVisualsCreations",
  timestamps: true,
});

async function checkCreations() {
  try {
    await sequelize.authenticate();
    const creations = await SongVisualsCreation.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10
    });
    console.log("Recent song visuals creations:");
    creations.forEach(c => {
      console.log(`- ID: ${c.id}, User: ${c.userId}, MusicStyle: ${c.musicStyle}, ArtStyle: ${c.artStyle}, Song: ${c.songUrl}, Video: ${c.videoUrl}, CreatedAt: ${c.createdAt}`);
    });
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
}

checkCreations();
