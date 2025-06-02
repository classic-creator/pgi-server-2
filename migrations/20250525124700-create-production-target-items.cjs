
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('production_target_items', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    production_target_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'production_target',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    product_variant_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'product_variants',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('production_target_items');
  },
};