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
      "modules",
      [
        {
          name: "Students",
          description: "Manage student records",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teachers",
          description: "Manage teacher records",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Classes",
          description: "Manage class schedules and assignments",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Subjects",
          description: "Manage subjects and curriculum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Attendance",
          description: "Track student attendance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Exams",
          description: "Manage exams and results",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Grades",
          description: "Record and view grades",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Timetable",
          description: "Manage school timetable",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fees",
          description: "Manage student fees and payments",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Notifications",
          description: "Send notifications to students and staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { logging: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
