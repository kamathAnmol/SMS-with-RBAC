import { Users, UserRoles, Roles, Tokens } from ".";

Users.hasMany(UserRoles, { foreignKey: "user" });
Roles.hasMany(UserRoles, { foreignKey: "role" });
UserRoles.belongsTo(Roles, { foreignKey: "role" });
UserRoles.belongsTo(Users, { foreignKey: "user" });

Tokens.belongsTo(UserRoles, { foreignKey: "userRole", onDelete: "CASCADE" });
UserRoles.hasOne(Tokens, { foreignKey: "userRole" });
