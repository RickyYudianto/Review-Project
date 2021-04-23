'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                id: 1,
                email: 'email@gmail.com',
                password: '$2a$10$EcfTW.aZxV3TLk9hyC/J4e5G86q/I9Wt5GC6jW./WzFsv0ExBfACm',
                name: 'admin',
                is_active: 1,
                type_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                email: 'employee1@gmail.com',
                password: '$2a$10$EcfTW.aZxV3TLk9hyC/J4e5G86q/I9Wt5GC6jW./WzFsv0ExBfACm',
                name: 'employee 1',
                is_active: 1,
                type_id: 2,
                created_at: new Date(),
                updated_at: new Date()
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};