'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('department', {
      department_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      created_on: { type: Sequelize.DATE },
      incharge_id: { type: Sequelize.INTEGER, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('department');
  }
};
