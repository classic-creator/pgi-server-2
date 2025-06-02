'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },       // e.g., "Kirloskar Diesel Generator"
      description: { type: Sequelize.TEXT },                    // General info
      category: { type: Sequelize.STRING },                     // Optional, e.g., "Generator"
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
