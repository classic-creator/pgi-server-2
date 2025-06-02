'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 up: async (queryInterface, Sequelize)=> {
    await queryInterface.createTable('order_statuses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'raw_material_order', // name of the parent table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
        step: {
        type: Sequelize.ENUM('order', 'delivered', 'quality check', 'quantity check', 'store'),
        allowNull: false,
        defaultValue: 'order' // <-- Default value set here
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

 down: async(queryInterface, Sequelize) =>{
    await queryInterface.dropTable('order_statuses');
  }
};
