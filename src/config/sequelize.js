import { config as getEnv } from 'dotenv';

getEnv();

const environment = process.env.NODE_ENV || 'development';
const isDevMode = environment === 'development';

const sequelizeConfig = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  logging: isDevMode ? log => log : false,
};

module.exports = sequelizeConfig;
