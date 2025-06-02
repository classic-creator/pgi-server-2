import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineEmployee = (sequelize) => {
  const Employee = sequelize.define('employee', {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    department_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
//     password: {
//   type: DataTypes.STRING,
//   allowNull: false
// },
    contact_number: { type: DataTypes.STRING },
    joining_date: { type: DataTypes.DATE },
    factory_id:{ type: DataTypes.INTEGER },
  }, {
    timestamps: false,
    tableName: 'employee'
  });

  return Employee;
};
export default defineEmployee