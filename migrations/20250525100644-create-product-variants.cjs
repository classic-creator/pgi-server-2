
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('product_variants', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  model: { type: Sequelize.STRING, allowNull: false },       // e.g., "KG25"
  kva: { type: Sequelize.INTEGER, allowNull: false },        // e.g., 25
  kw: { type: Sequelize.INTEGER },                           // e.g., 20
  phase: { type: Sequelize.INTEGER, allowNull: false },      // e.g., 3
  voltage: { type: Sequelize.STRING },                       // Optional, e.g., "415V"
  frequency: { type: Sequelize.STRING },                     // Optional, e.g., "50Hz"
  fuel_type: { type: Sequelize.STRING },                     // e.g., "Diesel"
  cooling_type: { type: Sequelize.STRING },                  // e.g., "Air", "Water"
  enclosure: { type: Sequelize.STRING },                     // e.g., "Silent", "Open"
  sku: { type: Sequelize.STRING, allowNull: false, unique: true }, // Auto-generated
  price: { type: Sequelize.FLOAT },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_variants');
  },
};