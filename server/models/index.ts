'use strict';

import { Sequelize } from 'sequelize-typescript';
import env from '../config/env';
import Assign from './assign';
import PerformanceFeedback from './performance-feedback';
import PerformanceReview from './performance-review';
import User from './user';
import UserType from './user-type';

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
  models: [ Assign, PerformanceFeedback, PerformanceReview, User, UserType ],
  logging: env.logging,
});

export default sequelize;