import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineFactory_location = (sequelize) => {
  const Factory_location = sequelize.define('factory_location', {
    factory_location_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    area_name: { type: DataTypes.STRING },
    floor_number: { type: DataTypes.STRING },
    manager_name: { type: DataTypes.STRING },
    contact_number: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'factory_location'
  });

  return Factory_location;
};
export default defineFactory_location