'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materials', {
      material_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,  // <-- add this line
      },
      name: { type: Sequelize.STRING },
      category_id: { type: Sequelize.INTEGER },
      variant_id: { type: Sequelize.INTEGER },
      uom: { type: Sequelize.STRING },
      condition_id: { type: Sequelize.INTEGER },
      location_id: { type: Sequelize.INTEGER },
      reorder_level: { type: Sequelize.INTEGER },
      storage_temperature: { type: Sequelize.DECIMAL(5, 2) },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('materials');
  },
};
