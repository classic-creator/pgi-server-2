'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('raw_material_order', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      material_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'materials',
          key: 'material_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE '
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vendors',
          key: 'vendor_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      factory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'factory_location',
          key: 'factory_location_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      full_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      advance_payment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('raw_material_order');
  }
};
