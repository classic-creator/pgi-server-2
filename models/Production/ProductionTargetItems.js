import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineProductionTargetItems = (sequelize) => {
  const ProductionTargetItems = sequelize.define('production_target_items', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    production_target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'production_target_items'
  });
  ProductionTargetItems.associate = (models) => {
ProductionTargetItems.belongsTo(models.ProductVarient, { foreignKey: 'product_variant_id', as: 'product_variant' });}
  return ProductionTargetItems;
};

export default defineProductionTargetItems;
