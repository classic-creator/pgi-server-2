import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineProductVariant = (sequelize) => {
  const ProductVarient = sequelize.define('product_variants', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    kva: { type: DataTypes.INTEGER, allowNull: false },
    kw: { type: DataTypes.INTEGER },
    phase: { type: DataTypes.INTEGER, allowNull: false },
    voltage: { type: DataTypes.STRING },
    frequency: { type: DataTypes.STRING },
    fuel_type: { type: DataTypes.STRING },
    cooling_type: { type: DataTypes.STRING },
    enclosure: { type: DataTypes.STRING },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.FLOAT }
  }, {
    timestamps: true,
    tableName: 'product_variants'
  });
   ProductVarient.associate = (models) => {
ProductVarient.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });}
  return ProductVarient;
};

export default defineProductVariant;
