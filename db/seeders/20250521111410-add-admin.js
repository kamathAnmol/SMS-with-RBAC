"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insert a new admin user
    const result = await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin User",
          email: "admin@example.com",
          password: "$2b$10$hashedpasswordhere", // Use a real bcrypt hash in production
          phone: "9999999999",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["id"] }
    );

    // 2. Get the Admin role's ID
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'Admin' LIMIT 1;"
    );
    const adminRoleId = adminRole[0]?.id;

    // 3. Link the user to the Admin role
    await queryInterface.bulkInsert("user_roles", [
      {
        user: result[0].id || 1, // fallback to 1 if returning doesn't work
        role: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove the admin user and its user_role link
    await queryInterface.bulkDelete("user_roles", null, {});
    await queryInterface.bulkDelete(
      "users",
      { email: "admin@example.com" },
      {}
    );
  },
};
