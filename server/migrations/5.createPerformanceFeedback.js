'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('performance_feedbacks', {
            performanceReviewId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                field: 'performance_review_id',
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'performance_reviews',
                    },
                    key: 'id'
                }
            },
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
            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'score'
            },
            feedback: {
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
        return queryInterface.dropTable('performance_feedbacks');
    }
};