import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineFactoryJob = (sequelize) => {
  const FactoryJob = sequelize.define('jobs', {
    job_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    target_id: { type: DataTypes.INTEGER, allowNull: false },
    scheduled_start: { type: DataTypes.DATE },
    scheduled_end: { type: DataTypes.DATE },
    actual_start: { type: DataTypes.DATE },
    actual_end: { type: DataTypes.DATE },
    manager_id: { type: DataTypes.INTEGER },
    factory_id: { type: DataTypes.INTEGER },

  }, {
    timestamps: true,
    tableName: 'jobs'
  });
// FactoryJob model (jobs.js)
FactoryJob.associate = (models) => {
  FactoryJob.hasMany(models.Batch, {
    foreignKey: 'job_id',
    as: 'batches',
  });
  FactoryJob.belongsTo(models.Factorys, {
    foreignKey: 'factory_id',
    as: 'factory',
  });
};

  return FactoryJob;
};

export default defineFactoryJob;
