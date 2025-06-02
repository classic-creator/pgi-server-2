import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineMaterials = (sequelize) => {
  const Materials = sequelize.define('materials', {
    material_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    category_id: { type: DataTypes.INTEGER },
    variant_id: { type: DataTypes.INTEGER },
    department_id: { type: DataTypes.INTEGER },
    condition_id: { type: DataTypes.INTEGER },
    location_id: { type: DataTypes.INTEGER },
    uom: { type: DataTypes.STRING },
    reorder_level: { type: DataTypes.INTEGER },
    storage_temperature: { type: DataTypes.DECIMAL(5, 2) },
  }, {
    timestamps: false,
    tableName: 'materials',
  });

  // Associations
  Materials.associate = (models) => {
    Materials.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      as: 'category'
    });

    Materials.belongsTo(models.Variants, {
      foreignKey: 'variant_id',
      as: 'variant'
    });

    Materials.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department'
    });

    Materials.belongsTo(models.Location, {
      foreignKey: 'location_id',
      as: 'location'
    });

    // Add this if you use Conditions model:
    // Materials.belongsTo(models.Conditions, {
    //   foreignKey: 'condition_id',
    //   as: 'condition'
    // });
  };

  return Materials;
};

export default defineMaterials;
