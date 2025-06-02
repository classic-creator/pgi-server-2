import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineProductionTarget = (sequelize) => {
  const ProductionTarget = sequelize.define('production_target', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_variant_id: { type: DataTypes.INTEGER },
    target_quantity: { type: DataTypes.INTEGER },
    deadline: { type: DataTypes.DATE },
    sales_user_id: { type: DataTypes.INTEGER },
    factory_id: { type: DataTypes.INTEGER }
  }, {
    timestamps: true,
    tableName: 'production_target'
  });

  ProductionTarget.associate = (models) => {
    ProductionTarget.hasOne(models.ProductionReview, {
      foreignKey: 'sales_target_id',
      as: 'status_info'
    });
      ProductionTarget.belongsTo(models.Factorys, {      // assuming models.Factorys is the factory location model
      foreignKey: 'factory_id',               // use factory_location_id as FK
      as: 'factory',                           // alias for the factory location
    });
  
  };

  return ProductionTarget;
};

export default defineProductionTarget;
