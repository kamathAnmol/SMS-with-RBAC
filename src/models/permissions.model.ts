import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";

class Permissions extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public readRoutes!: string[];
  public writeRoutes!: string[];
  public deleteRoutes!: string[];
}

Permissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    readRoutes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    writeRoutes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    deleteRoutes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "permissions",
  }
);

export default Permissions;
