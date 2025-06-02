'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('issues', {
      issue_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      material_id: { type: Sequelize.INTEGER },
      job_id: { type: Sequelize.INTEGER },
      quantity_issued: { type: Sequelize.INTEGER },
      issue_date: { type: Sequelize.DATE },
      approved_by: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('issues');
  }
};
