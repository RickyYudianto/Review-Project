'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_types', [
            {id: 1, name: 'admin', created_at: new Date(), updated_at: new Date()},
            {id: 2, name: 'employee', created_at: new Date(), updated_at: new Date()},
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_types', null, {});
    }
};