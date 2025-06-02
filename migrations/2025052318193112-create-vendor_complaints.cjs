'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendor_complaints', {
      complaint_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      vendor_id: { type: Sequelize.INTEGER },
      complaint_date: { type: Sequelize.DATE },
      description: { type: Sequelize.TEXT },
      status: { type: Sequelize.STRING },
      resolution_notes: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendor_complaints');
  }
};
