const Sequilize = require('sequelize');
const sequilize = require('../connection');

const ProxyBodyNakModel = sequilize.define(
    'proxynakbody',
    {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        number: {
            type: Sequilize.INTEGER,
            allowNull: false,
        },

        productId: {
            type: Sequilize.INTEGER,
            allowNull: false,
            foreignKey: true,
        },

        edIzmId: {
            type: Sequilize.INTEGER,
            allowNull: true,
            foreignKey: true,
        },

        vidUp: {
            type: Sequilize.STRING(10),           
            allowNull: true,
        },
        
        kolVOdnom: {
            type: Sequilize.INTEGER,           
            allowNull: true,
        },

        kolMest: {
            type: Sequilize.INTEGER,           
            allowNull: true,
        },

        massaBr: {
            type: Sequilize.FLOAT,           
            allowNull: true,
        },

        kol_massaNet: {
            type: Sequilize.FLOAT,           
            allowNull: false,
        },

        stavkaNDS: {
            type: Sequilize.FLOAT,           
            allowNull: true,
        },

        proxyHeaderNakId: {
            type: Sequilize.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
    },

    {
        timestamps: false,
    },
);

module.exports = ProxyBodyNakModel;