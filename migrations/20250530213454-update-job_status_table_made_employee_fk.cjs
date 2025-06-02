'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.addConstraint('job_status', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'created_by', // custom constraint name
      references: {
        table: 'employee',   // adjust if needed
        field: 'employee_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',  // or 'CASCADE' as you want
    });
  },

  

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
