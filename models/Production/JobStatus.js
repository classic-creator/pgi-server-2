import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineJobStatus = (sequelize) => {
  const JobStatus = sequelize.define('job_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    batch_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.TEXT },
    created_by: { type: DataTypes.INTEGER }
  }, {
    timestamps: true,
    tableName: 'job_status'
  });
 
JobStatus.associate = (models) => {
  JobStatus.belongsTo(models.Employee, {
    foreignKey: 'created_by',
    as: 'employee',
  });
};

  return JobStatus;
};

export default defineJobStatus;
