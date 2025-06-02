import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineBatch = (sequelize) => {
  const Batch = sequelize.define('job_Batches', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    job_id: { type: DataTypes.INTEGER, allowNull: false },
    product_variant_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER },
    // factory_id:{type: DataTypes.INTEGER }

  }, {
    timestamps: true,
    tableName: 'job_Batches'
  });


  // Batch model (job_Batches.js)
  Batch.associate = (models) => {
    Batch.belongsTo(models.FactoryJob, {
      foreignKey: 'job_id',
      as: 'job',
    });

    Batch.belongsTo(models.ProductVarient, {
    foreignKey: 'product_variant_id',
    as: 'product_variant',
  });
  

 Batch.hasMany(models.JobStatus, {   // or hasOne if only one status per batch
    foreignKey: 'batch_id',
    as: 'statuses',  // plural for hasMany, singular if hasOne
  });

  };


  return Batch;
};

export default defineBatch;