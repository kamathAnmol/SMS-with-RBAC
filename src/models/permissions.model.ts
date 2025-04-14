import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import Modules from "./modules.model";
import Roles from "./roles.model";

class Permissions extends Model {
  public id!: number;
  public role!: number;
  public module!: number;
  public permissions!: string;
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
    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[01]{3}$/,
          msg: "Permissions must be a string of 3 characters, 0 or 1",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "permissions",
  }
);

export default Permissions;
