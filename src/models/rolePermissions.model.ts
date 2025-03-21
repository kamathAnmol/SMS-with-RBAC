import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";

class RolePermissions extends Model {
  public id!: number;
  public permission!: number;
  public read!: boolean;
  public write!: boolean;
  public delete!: boolean;
}

RolePermissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "role-permissions",
  }
);

export default RolePermissions;
