import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import User from "@models/users.model";

class Config extends Model {
  public id!: number;
  public name!: string;
  public value!: string;
  public author!: string;
}

Config.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        max: 30,
        min: 2,
      },
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "config",
    timestamps: true,
    comment: "Config Table - Configure the env",
  }
);

export default Config;
