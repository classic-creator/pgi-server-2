'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MaterialRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
        references: { model: 'job_batches', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      material_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Optional FK to Materials table
        references: { model: 'materials', key: 'material_id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
   
      requested_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Optional FK to Employees table
        references: { model: 'employee', key: 'employee_id' },
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('MaterialRequests');
  },
};
