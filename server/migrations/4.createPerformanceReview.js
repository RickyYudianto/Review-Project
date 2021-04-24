'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('performance_reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            periodStart: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'period_start'
            },
            periodEnd: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'period_end'
            },
            feedbackStart: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'feedback_start'
            },
            feedbackEnd: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'feedback_end'
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
        return queryInterface.dropTable('performance_reviews');
    }
};