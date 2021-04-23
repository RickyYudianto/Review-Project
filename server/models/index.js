'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json');

const env = config[process.env.NODE_ENV || 'development'];

const DB_DATABASE = env.database;
const DB_HOST = env.host;
const DB_USER = env.username;
const DB_PASS = env.password;

console.log(process.env.NODE_ENV);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

let db = {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;