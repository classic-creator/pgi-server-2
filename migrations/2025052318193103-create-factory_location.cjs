'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('factory_location', {
      factory_location_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      area_name: { type: Sequelize.STRING },
      floor_number: { type: Sequelize.STRING },
      manager_name: { type: Sequelize.STRING },
      contact_number: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('factory_location');
  }
};
