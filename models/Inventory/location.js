import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineLocation = (sequelize) => {
  const Location = sequelize.define('location', {
    location_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    factory_location_id: { type: DataTypes.INTEGER },
    location_name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    aisle_number: { type: DataTypes.STRING },
    bin_label: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'location'
  });

  return Location;
};

export default defineLocation