import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineVendor_complaints = (sequelize) => {
  const Vendor_complaints = sequelize.define('vendor_complaints', {
    complaint_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    vendor_id: { type: DataTypes.INTEGER },
    complaint_date: { type: DataTypes.DATE },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING },
    resolution_notes: { type: DataTypes.TEXT },
  }, {
    timestamps: false,
    tableName: 'vendor_complaints'
  });

  return Vendor_complaints;
};
export default defineVendor_complaints