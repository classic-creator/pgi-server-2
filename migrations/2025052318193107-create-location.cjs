'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('location', {
      location_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      factory_location_id: { type: Sequelize.INTEGER },
      location_name: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      aisle_number: { type: Sequelize.STRING },
      bin_label: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('location');
  }
};
