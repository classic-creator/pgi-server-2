import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineVendor = (sequelize) => {
  const Vendors = sequelize.define('vendors', {
    vendor_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING },
    contact_info: { type: DataTypes.STRING },
    gst_number: { type: DataTypes.STRING },
    registration_date: { type: DataTypes.DATE },
    rating: { type: DataTypes.DECIMAL(3,2) },
  }, {
    timestamps: false,
    tableName: 'vendors'
  });

  return Vendors;
};
 export default defineVendor