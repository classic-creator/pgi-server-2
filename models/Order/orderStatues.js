import { DataTypes } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize 
 */
const defineOrderStatus = (sequelize) => {
    const OrderStatus = sequelize.define('order_statuses', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        step: {
            type: DataTypes.ENUM('order', 'delivered', 'quality check', 'quantity check', 'store','done'),
            allowNull: false,
            defaultValue: 'order',
        },
        time: {

            allowNull: false,
            type: DataTypes.DATEONLY,

        }
    }, {
        timestamps: true,
        tableName: 'order_statuses',
    });

    return OrderStatus;
};

export default defineOrderStatus;
