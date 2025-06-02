'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Only add autoIncrement, not primaryKey again
    await queryInterface.changeColumn('finished_goods', 'finished_good_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    });

    // await queryInterface.removeColumn('finished_goods', 'qc_status');

    // await queryInterface.addColumn('finished_goods', 'variant_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'product_variants',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('finished_goods', 'finished_good_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: false,
    });

    await queryInterface.addColumn('finished_goods', 'qc_status', {
      type: Sequelize.STRING,
    });

    await queryInterface.removeColumn('finished_goods', 'variant_id');
  },
};
