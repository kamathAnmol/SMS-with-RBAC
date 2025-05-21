import { Users, UserRoles, Roles, Tokens, Permissions, Modules } from ".";

Users.belongsToMany(Roles, {
  through: UserRoles,
  foreignKey: "user",
  otherKey: "role",
});
Roles.belongsToMany(Users, {
  through: UserRoles,
  foreignKey: "role",
  otherKey: "user",
});
UserRoles.belongsTo(Users, { foreignKey: "user" });
UserRoles.belongsTo(Roles, { foreignKey: "role" });

Tokens.belongsTo(UserRoles, { foreignKey: "userRole", onDelete: "CASCADE" });
UserRoles.hasOne(Tokens, { foreignKey: "userRole" });

Roles.hasMany(Permissions, { foreignKey: "role" });
Modules.hasMany(Permissions, { foreignKey: "module" });
