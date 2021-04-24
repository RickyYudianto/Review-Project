'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                field: 'is_active'
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'type_id',
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'user_types',
                    },
                    key: 'id'
                }
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
        return queryInterface.dropTable('users');
    }
};