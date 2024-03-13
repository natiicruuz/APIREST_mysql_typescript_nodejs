import { Sequelize } from 'sequelize'

import { env } from '../config/env'

export const sequelizeConnection = new Sequelize(
  env.MYSQL_DATABASE,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  {
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
  }
)
