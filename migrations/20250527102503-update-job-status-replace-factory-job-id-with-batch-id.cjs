'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Remove factory_job_id
    await queryInterface.removeColumn('job_status', 'factory_job_id');

    // 2. Add batch_id referencing job_batches
    await queryInterface.addColumn('job_status', 'batch_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'job_batches', // Ensure this matches your actual table name
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert: remove batch_id, re-add factory_job_id
    await queryInterface.removeColumn('job_status', 'batch_id');

    await queryInterface.addColumn('job_status', 'factory_job_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'job_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
