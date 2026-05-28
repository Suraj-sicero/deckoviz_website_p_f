import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserOnboarding = sequelize.define("UserOnboarding", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  currentStep: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  answers: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "{}",
    comment: "JSON string capturing questions and answers from the onboarding intake flow",
  },
});

export default UserOnboarding;
