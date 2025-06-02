'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key constraint for category_id
    await queryInterface.addConstraint('materials', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'fk_materials_category',  // custom FK constraint name
      references: {
        table: 'categories',
        field: 'category_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Add foreign key constraint for variant_id
    await queryInterface.addConstraint('materials', {
      fields: ['variant_id'],
      type: 'foreign key',
      name: 'fk_materials_variant',
      references: {
        table: 'variants',
        field: 'variant_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Add foreign key constraint for condition_id
  
    // Add foreign key constraint for location_id
    await queryInterface.addConstraint('materials', {
      fields: ['location_id'],
      type: 'foreign key',
      name: 'fk_materials_location',
      references: {
        table: 'location',
        field: 'location_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('materials', 'fk_materials_category');
    await queryInterface.removeConstraint('materials', 'fk_materials_variant');
    await queryInterface.removeConstraint('materials', 'fk_materials_location');
  },
};
