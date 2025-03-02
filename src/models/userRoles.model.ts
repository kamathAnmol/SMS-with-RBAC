import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./users.model";
import Roles from "./roles.model";

class UserRoles extends Model {
  public id!: number;
  public user!: number;
  public role!: number;
  public faculty!: number;
  public student!: number;
  public hod!: number;
  public admin!: number;
}

UserRoles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      references: { model: Roles, key: "id" },
      allowNull: false,
    },
    faculty: {
      // todo : add reference once table is created
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    student: {
      // todo : add reference once table is created
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hod: {
      // todo : add reference once table is created
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    admin: {
      // todo : add reference once table is created
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_roles",
    indexes: [
      {
        unique: true,
        fields: ["user", "role"],
      },
    ],
  }
);

export default UserRoles;
