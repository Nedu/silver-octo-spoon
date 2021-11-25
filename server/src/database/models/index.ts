import { Sequelize } from 'sequelize';
import RushingStatisticsFactory from './rushingstatistics'

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

const RushingStatistics = RushingStatisticsFactory(sequelize);

export { RushingStatistics, Sequelize, sequelize };
