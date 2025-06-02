import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
const defineFinished_goods = (sequelize) => {
  const Finished_goods = sequelize.define(
    'finished_goods',
    {
      finished_good_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      job_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      completion_date: {
        type: DataTypes.DATE,
      },
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'product_variants',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      tableName: 'finished_goods',
    }
  );

  // Associations
  Finished_goods.associate = (models) => {
    Finished_goods.belongsTo(models.ProductVarient, {
      foreignKey: 'variant_id',
      as: 'variant',
    });
  };

  return Finished_goods;
};

export default defineFinished_goods;
