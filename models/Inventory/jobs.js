import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineJobs = (sequelize) => {
  const Jobs = sequelize.define('jobs', {
    job_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    job_name: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    employee_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    remarks: { type: DataTypes.TEXT },
  }, {
    timestamps: false,
    tableName: 'jobs'
  });

  return Jobs;
};
export default defineJobs