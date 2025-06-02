'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Remove the existing foreign key and column for production_review_id
    await queryInterface.removeColumn('jobs', 'production_review_id');

    // 2. Add new column production_target_id referencing production_targets
    await queryInterface.addColumn('jobs', 'target_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'production_target',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert: remove production_target_id, re-add production_review_id
    await queryInterface.removeColumn('jobs', 'target_id');

    await queryInterface.addColumn('jobs', 'production_review_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'production_reviews',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
