'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('variants', {
      variant_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      category_id: { type: Sequelize.INTEGER },
      variant_name: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      version_code: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('variants');
  }
};
