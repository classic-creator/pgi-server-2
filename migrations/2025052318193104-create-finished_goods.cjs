'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('finished_goods', {
      finished_good_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      job_id: { type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      quantity: { type: Sequelize.INTEGER },
      completion_date: { type: Sequelize.DATE },
      qc_status: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('finished_goods');
  }
};
