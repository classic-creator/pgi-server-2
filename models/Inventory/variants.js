import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineVariants = (sequelize) => {
  const Variants = sequelize.define('variants', {
    variant_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    category_id: { type: DataTypes.INTEGER },
    variant_name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    version_code: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'variants'
  });

  return Variants;
};
export default defineVariants