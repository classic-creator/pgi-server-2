import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */

const MaterialRequestModel = (sequelize) => {
  const MaterialRequest = sequelize.define('materialrequests', {



    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    requested_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
    {
      tableName: 'materialrequests',
      timestamps: true,
    }
  );

  MaterialRequest.associate = (models) => {
    // Define associations here if you want, e.g.:
    MaterialRequest.belongsTo(models.Batch, { foreignKey: 'batch_id', as: 'batch' });
    MaterialRequest.belongsTo(models.Materials, { foreignKey: 'material_id', as: 'material' });
    MaterialRequest.belongsTo(models.Employee, { foreignKey: 'requested_by', as: 'employee' });
    // MaterialRequest.belongsTo(models.MaterialRequestStatus, { foreignKey: 'material_request_id' ,as:'MaterialRequest' });
    MaterialRequest.hasMany(models.MaterialRequestStatus, {
      foreignKey: 'material_request_id',
      as: 'statuses',
    });
  
  };

  return MaterialRequest;
};

export default MaterialRequestModel;
