import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineDepartment = (sequelize) => {
  const Department = sequelize.define('department', {

    department_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    created_on: { type: DataTypes.DATE },
    incharge_id: { type: DataTypes.INTEGER, unique: true },
  }, {
    timestamps: false,
    tableName: 'department'
  });

  return Department;
};
export default defineDepartment;