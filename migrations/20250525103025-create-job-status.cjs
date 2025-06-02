'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {await queryInterface.createTable('job_status', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  factory_job_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'job_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  comment: Sequelize.TEXT,
  created_by: {
    type: Sequelize.INTEGER,
    references: {
      model: 'employee',
      key: 'employee_id',
    },
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
  },  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('job_status');
  }
};