import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineCategories = (sequelize) => {
  const Categories = sequelize.define('categories', {
    category_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    category_name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    is_active: { type: DataTypes.BOOLEAN },
  }, {
    timestamps: false,
    tableName: 'categories'
  });

  return Categories;
};

export default defineCategories;


