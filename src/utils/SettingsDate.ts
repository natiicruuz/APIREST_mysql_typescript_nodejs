import winston from 'winston'
import { Date } from './Date'
import { env } from '../config/env'
const { combine, timestamp, printf, colorize } = winston.format

export class SettingsDate {
  config: object
  readonly dateManaguer = new Date()

  constructor () {
    this.config = {
      level: env.NODE_ENV !== 'production' ? 'debug' : 'info',
      handleExceptions: true,
      json: false,
      colorize: true,
      format: combine(
        colorize(),
        timestamp({
          format: () => this.dateManaguer.getSysDateString().toString()
        }),
        printf((info) => {
          const { level, message, ...extra } = info
          return `${info.timestamp as string} [${level}]: ${message as string} ${
              Number.isNaN(Object.keys(extra).length) ? JSON.stringify(extra, null, 2) : ''
          }`
        })
      )
    }
  }
}
