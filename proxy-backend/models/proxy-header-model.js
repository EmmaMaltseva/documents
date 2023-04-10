const Sequelize = require('sequelize');
const sequelize = require('../connection');


const ProxyHeaderModel = sequelize.define(
    'proxyheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dischargeDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        individualId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreighKey: true,
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreighKey: true,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = ProxyHeaderModel;