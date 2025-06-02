
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('production_target', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
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
  target_quantity: { type: Sequelize.INTEGER, allowNull: false },
  deadline: { type: Sequelize.DATE },
  sales_user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'employee',
      key: 'employee_id',
    }
  },
  factory_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'factory_location',
      key: 'factory_location_id',
    }
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('production_target');
  },
};