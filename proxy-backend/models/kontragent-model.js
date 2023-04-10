const { Model } = require('sequelize');
const Sequilize = require('sequelize');
const sequilize = require('../connection');

const KontragentModel = sequilize.define(
    'kontragent',

    {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        title: {
            type: Sequilize.STRING(50),
            allowNull: false,
        },

        inn: {
            type: Sequilize.STRING(10),
            allowNull: false,
        },

        kpp: {
            type: Sequilize.STRING(9),
            allowNull: true,
        },

        adres: {
            type: Sequilize.STRING(255),
            allowNull: false,
        },

        telephone: {
            type: Sequilize.STRING(18),
            allowNull: false,
        },

        bank: {
            type: Sequilize.STRING(100),
            allowNull: false,
        },

        bik: {
            type: Sequilize.STRING(9),
            allowNull: true,
        },

        korSchet: {
            type: Sequilize.STRING(20),
            allowNull: false,
        },
    },
        
    {
        timestamps: false,
    },
);

module.exports = KontragentModel;