"use strict";
const constants = require('../constants/tableName.constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(constants.USER_TYPES, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(constants.USER_TYPES);
    }
};