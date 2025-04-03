import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import User from "@models/users.model";
import Roles from "@models/roles.model";

class UserRoles extends Model {
  public id!: number;
  public user!: number;
  public role!: number;
  public value!: any;
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
