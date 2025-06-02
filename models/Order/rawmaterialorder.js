
import { DataTypes } from 'sequelize';


/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineRawMaterialOrder = (sequelize) => {
  const RawMaterialOrder = sequelize.define('raw_material_order', {


    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    material_id: {
      type: DataTypes.INTEGER,
    },
    vendor_id: DataTypes.INTEGER,
    factory_id: DataTypes.INTEGER,
    full_amount: DataTypes.DECIMAL,
    advance_payment: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    rejectQuantity: DataTypes.INTEGER
  }, {
    timestamps: true,
    tableName: 'raw_material_order',
  });



    RawMaterialOrder.associate = (models) => {
    RawMaterialOrder.belongsTo(models.Materials, { foreignKey: 'material_id', as: 'material' });
    RawMaterialOrder.belongsTo(models.Vendors, { foreignKey: 'vendor_id', as: 'vendor' });
    RawMaterialOrder.belongsTo(models.Factorys, { foreignKey: 'factory_id', as: 'factory' });
  };


  return RawMaterialOrder;
};

export default defineRawMaterialOrder;
