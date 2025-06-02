'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Remove factory_job_id
    

    // 2. Add batch_id referencing job_batches
    // await queryInterface.addColumn('materials', 'department_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
      
    //   references: {
    //     model: 'department', // Ensure this matches your actual table name
    //     key: 'department_id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert: remove department_id, re-add factory_job_id
    await queryInterface.removeColumn('materials', 'department_id');

  
  }
};
