import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import User from "./users.model";

class Sessions extends Model {
  public id!: number;
  public user!: number;
  public access_token!: String;
  public refresh_token!: String;
}

Sessions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      unique: true,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sessions",
    createdAt: true,
  }
);

export default Sessions;
