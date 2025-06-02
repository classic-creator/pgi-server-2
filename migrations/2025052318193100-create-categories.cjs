'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      category_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      category_name: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      is_active: { type: Sequelize.BOOLEAN },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  }
};
