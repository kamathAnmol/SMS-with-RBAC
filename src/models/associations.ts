import { Users, UserRoles, Roles, Tokens } from ".";
import Permissions from "./permissions.model";
import RolePermissions from "./rolePermissions.model";

Users.hasMany(UserRoles, { foreignKey: "user" });
Roles.hasMany(UserRoles, { foreignKey: "role" });
UserRoles.belongsTo(Roles, { foreignKey: "role" });
UserRoles.belongsTo(Users, { foreignKey: "user" });

Tokens.belongsTo(UserRoles, { foreignKey: "userRole", onDelete: "CASCADE" });
UserRoles.hasOne(Tokens, { foreignKey: "userRole" });

RolePermissions.hasOne(Permissions, { foreignKey: "permission" });
RolePermissions.belongsTo(Roles, { foreignKey: "role" });
