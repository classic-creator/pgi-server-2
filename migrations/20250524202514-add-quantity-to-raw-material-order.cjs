'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('raw_material_order', 'quantity', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   defaultValue: 0,
    // });

    // await queryInterface.addColumn('raw_material_order', 'rejectQuantity', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   defaultValue: 0,
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('raw_material_order', 'quantity');
    await queryInterface.removeColumn('raw_material_order', 'rejectQuantity');
  }
};
