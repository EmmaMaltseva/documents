const Sequelize = require('sequelize');
const sequelize = require('../connection');

const EdizmModel = sequelize.define(
    'edizm',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        edIzm: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        okei: {
            type: Sequelize.STRING(4),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = EdizmModel;