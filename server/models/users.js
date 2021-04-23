'use strict';
const constants = require('../constants/tableName.constants');

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define(constants.USERS, {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    isActive : {
      field: 'is_active',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 1
    }
  }, {
    tableName: constants.USERS,
    underscored: true,
    sequelize
  });

  Users.associate = (models) => {
    Users.belongsTo(models.user_types, {
      foreignKey: 'typeId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return Users;

};