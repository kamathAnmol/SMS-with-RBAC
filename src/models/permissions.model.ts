import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import Modules from "./modules.model";
import Roles from "./roles.model";

class Permissions extends Model {
  public id!: number;
  public role!: number;
  public module!: number;
  public read!: boolean;
  public write!: boolean;
  public delete!: boolean;
}

Permissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Roles,
        key: "id",
      },
    },
    module: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Modules,
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    write: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "permissions",
  }
);

export default Permissions;
