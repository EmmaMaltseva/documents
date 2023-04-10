const Sequilize = require('sequelize');
const sequilize = require('../connection');

const ProxyBodyModel = sequilize.define(
    'proxybody',
    {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        count: {
            type: Sequilize.INTEGER,
            defaultValue: 1,
            allowNull: true,
        },

        unit: {
            type: Sequilize.STRING(8),
            allowNull: false,
        },

        proxyHeaderId: {
            type: Sequilize.INTEGER,           
            foreignKey: true,
            allowNull: false,
        },

        productId: {
            type: Sequilize.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
    },

    {
        timestamps: false,
    },
);

module.exports = ProxyBodyModel;