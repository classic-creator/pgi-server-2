import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineStock = (sequelize) => {
  const Stock = sequelize.define('stock', {
    stock_id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true, allowNull: false },
    material_id: { type: DataTypes.INTEGER },
    factory_id: { type: DataTypes.INTEGER },
    quantity_available: { type: DataTypes.INTEGER },
    last_updated: { type: DataTypes.DATE },
  }, {
    timestamps: false,
    tableName: 'stock'
  });

  return Stock;
};
export default defineStock