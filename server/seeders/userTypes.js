'use strict';
const constants = require('../constants/tableName.constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(constants.USER_TYPES, [
            { id: 1, name : 'admin', created_at : new Date(), updated_at : new Date() },
            { id: 2, name : 'employee', created_at : new Date(), updated_at : new Date() },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants.USER_TYPES, null, {});
    }
};