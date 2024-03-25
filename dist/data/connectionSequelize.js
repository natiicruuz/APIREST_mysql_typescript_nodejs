"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("../config/env");
exports.sequelizeConnection = new sequelize_1.Sequelize(env_1.env.MYSQL_DATABASE, env_1.env.MYSQL_USER, env_1.env.MYSQL_PASSWORD, {
    host: env_1.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
});
