import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const definePurchases = (sequelize) => {
  const Purchases = sequelize.define('purchases', {
    purchase_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    vendor_id: { type: DataTypes.INTEGER },
    material_id: { type: DataTypes.INTEGER },
    purchase_date: { type: DataTypes.DATE },
    quantity: { type: DataTypes.INTEGER },
    cost: { type: DataTypes.DECIMAL(10,2) },
    payment_status: { type: DataTypes.STRING },
    invoice_number: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'purchases'
  });

  return Purchases;
};
export default definePurchases