import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
const MaterialRequestStatusModel = (sequelize) => {
  const MaterialRequestStatus = sequelize.define('material_request_statuses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    material_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    changed_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'material_request_statuses',
    timestamps: true,
  });

  MaterialRequestStatus.associate = (models) => {
   MaterialRequestStatus.belongsTo(models.MaterialRequest, {
  foreignKey: 'material_request_id',
  as: 'request',
});
    MaterialRequestStatus.belongsTo(models.Employee, {
      foreignKey: 'changed_by',
      as: 'employee',
    });
    // optionally associate changed_by with Employee model if needed
  };

  return MaterialRequestStatus;
};

export default MaterialRequestStatusModel;
