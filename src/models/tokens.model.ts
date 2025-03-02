import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";
import UserRoles from "@models/userRoles.model";

class Tokens extends Model {
  public token!: String;
  public user!: number;
  public createdAt!: Date;
  public expiresOn!: Date;
}

Tokens.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userRole: {
      type: DataTypes.INTEGER,
      references: {
        model: UserRoles,
        key: "id",
      },
      unique: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiresOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Token",
    timestamps: false,
  }
);

export default Tokens;
