import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Roles extends Model {
  public id!: number;
  public name!: String;
  public description!: String;
}

Roles.init(
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
    },
  },
  {
    sequelize,
    tableName: "roles",
  }
);

export default Roles;
