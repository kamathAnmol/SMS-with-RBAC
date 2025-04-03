import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";

export default class Modules extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
}

Modules.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 15],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "modules",
  }
);
