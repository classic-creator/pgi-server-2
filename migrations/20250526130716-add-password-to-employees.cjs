'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('employee', 'password', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   defaultValue: '' // temporarily required to avoid null issues on existing rows
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employee', 'password');
  }
};
