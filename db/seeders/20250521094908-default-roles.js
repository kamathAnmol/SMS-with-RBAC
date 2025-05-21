"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Default",
          description: "Default Role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin",
          description: "System administrator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teacher",
          description: "Faculty member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Student",
          description: "Enrolled student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Parent",
          description: "Parent or guardian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Default",
          description: "Parent or guardian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "roles",
      {
        name: ["Admin", "Teacher", "Student", "Parent"],
      },
      {}
    );
  },
};
