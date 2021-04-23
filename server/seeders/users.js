'use strict';
const constants = require('../constants/tableName.constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(constants.USERS, [
            { email: 'email@gmail.com', password: '123456', name : 'admin', is_active: 1, type_id: 1, created_at : new Date(), updated_at : new Date() },
            { email: 'employee1@gmail.com', password: '123456', name : 'employee 1', is_active: 1, type_id: 2, created_at : new Date(), updated_at : new Date() },
        ] );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(constants.USERS, null, {});
    }
};