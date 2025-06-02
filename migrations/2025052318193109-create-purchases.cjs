'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('purchases', {
      purchase_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      vendor_id: { type: Sequelize.INTEGER },
      material_id: { type: Sequelize.INTEGER },
      purchase_date: { type: Sequelize.DATE },
      quantity: { type: Sequelize.INTEGER },
      cost: { type: Sequelize.DECIMAL(10,2) },
      payment_status: { type: Sequelize.STRING },
      invoice_number: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('purchases');
  }
};
