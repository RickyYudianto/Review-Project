'use strict';

import { Sequelize } from 'sequelize-typescript';
import env from '../config/env';
import User from './user';
import UserType from './userType';

const DB_DATABASE = env.database;
const DB_HOST = env.host;
const DB_USER = env.username;
const DB_PASS = env.password;
const DB_PORT = env.port;

const sequelize = new Sequelize({
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASS,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  models: [ User, UserType ],
  logging: env.logging
});

export default sequelize;