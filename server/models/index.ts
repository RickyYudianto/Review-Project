'use strict';

import { Sequelize } from 'sequelize-typescript'
import config from '../config/config.json';
import User from "./user";
import UserType from "./userType";

const env = process.env.NODE_ENV === 'production' ? config.production : config.development;

const DB_DATABASE = env.database;
const DB_HOST = env.host;
const DB_USER = env.username;
const DB_PASS = env.password;
const DB_PORT = env.port;

console.log(process.env.NODE_ENV);

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
  models: [User, UserType]
});

sequelize.sync();

export default sequelize;