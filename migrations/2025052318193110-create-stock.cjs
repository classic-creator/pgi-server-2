'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stock', {
      stock_id: {    type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, },
      material_id: { type: Sequelize.INTEGER },
      quantity_available: { type: Sequelize.INTEGER },
      last_updated: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stock');
  }
};
