'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('assigns', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: 'user_id',
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'users',
                    },
                    key: 'id'
                }
            },
            reviewerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: 'reviewer_id',
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'users',
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
        return queryInterface.dropTable('assigns');
    }
};