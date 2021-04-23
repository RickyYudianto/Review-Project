'use strict';
const constants = require('../constants/tableName.constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(constants.USER_TYPES, [
            { name : 'admin', created_at : new Date(), updated_at : new Date() },
            { name : 'employee', created_at : new Date(), updated_at : new Date() },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants.USER_TYPES, null, {});
    }
};