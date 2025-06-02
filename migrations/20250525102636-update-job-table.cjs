'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop existing 'jobs' table if exists
    await queryInterface.dropTable('jobs');

    // Recreate 'jobs' table with new structure
    await queryInterface.createTable('jobs', {
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      production_review_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'production_reviews',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      scheduled_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      scheduled_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      actual_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      actual_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'employee',
          key: 'employee_id',
        },
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
    // Drop the new 'jobs' table
    await queryInterface.dropTable('jobs');

    // Recreate old 'jobs' table (optional rollback)
    await queryInterface.createTable('jobs', {
      job_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      job_name: { type: Sequelize.STRING },
      start_date: { type: Sequelize.DATE },
      end_date: { type: Sequelize.DATE },
      employee_id: { type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING },
      remarks: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  }
};
