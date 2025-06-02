'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendors', {
      vendor_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING },
      contact_info: { type: Sequelize.STRING },
      gst_number: { type: Sequelize.STRING },
      registration_date: { type: Sequelize.DATE },
      rating: { type: Sequelize.DECIMAL(3,2) },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendors');
  }
};
