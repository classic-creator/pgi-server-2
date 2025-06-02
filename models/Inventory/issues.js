import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */


const defineIssues = (sequelize) => {
  const Issues = sequelize.define('issues', {
    issue_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    material_id: { type: DataTypes.INTEGER },
    job_id: { type: DataTypes.INTEGER },
    quantity_issued: { type: DataTypes.INTEGER },
    issue_date: { type: DataTypes.DATE },
    approved_by: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'issues'
  });

  return Issues;
};
export default defineIssues