const Sequelize = require('sequelize');
const sequelize = require('../connection');


const ProxyHeaderNakModel = sequelize.define(
    'proxynakheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        dateSost: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        organizGruzootpId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreighKey: true,
        },
        kontrGruzopolId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreighKey: true,
        },
        organizPostavId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreighKey: true,
        },
        kontrPlatId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        osnovan: {
            type: Sequelize.STRING(255),
            allowNull: false,
            foreighKey: true,
        },
        struktPodr: {
            type: Sequelize.STRING(150),
            allowNull: true,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = ProxyHeaderNakModel;