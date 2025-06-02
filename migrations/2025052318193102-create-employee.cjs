'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employee', {
      employee_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      department_id: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      role: { type: Sequelize.STRING },
      contact_number: { type: Sequelize.STRING },
      joining_date: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employee');
  }
};
