'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('production_reviews', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  sales_target_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'production_target',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  review_notes: { type: Sequelize.TEXT },
  status: {
    type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  production_user_id: {
    type: Sequelize.INTEGER,
    references: {
        model: 'employee',
      key: 'employee_id',
    }
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('production_reviews');
  },
};