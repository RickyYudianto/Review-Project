'use strict';
const constants = require('../constants/tableName.constants');

module.exports = (sequelize, DataTypes) => {

    const UserTypes = sequelize.define(constants.USER_TYPES, {
        name: DataTypes.STRING
    }, {
        tableName: constants.USER_TYPES,
        underscored: true,
        sequelize
    });

    UserTypes.associate = (models) => {
        UserTypes.hasMany(models.users, {
            foreignKey: 'typeId',
            sourceKey: 'id'
        });
    };

    UserTypes.up = (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(constants.USER_TYPES, [
            { id: 1, name : 'admin', createdAt : new Date(), updatedAt : new Date() },
            { id: 2, name : 'employee', createdAt : new Date(), updatedAt : new Date() },
        ]);
    }
    UserTypes.down = (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants.USER_TYPES, null, {});
    }

    return UserTypes;

};