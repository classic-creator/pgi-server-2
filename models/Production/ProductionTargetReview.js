import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineProductionReview = (sequelize) => {
  const ProductionReview = sequelize.define('production_reviews', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sales_target_id: { type: DataTypes.INTEGER, allowNull: false },
    review_notes: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    production_user_id: { type: DataTypes.INTEGER }
  }, {
    timestamps: true,
    tableName: 'production_reviews'
  });

  ProductionReview.associate = (models) => {
    ProductionReview.belongsTo(models.ProductionTarget, {
      foreignKey: 'sales_target_id'
    });
  };

  return ProductionReview;
};

export default defineProductionReview;
