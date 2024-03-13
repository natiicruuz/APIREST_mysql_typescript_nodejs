import winston from 'winston'
import { SettingsDate } from './SettingsDate'

export class Logger {
  static instance: Logger
  readonly logger: any
  readonly loggerTransport: any
  readonly settings = new SettingsDate()

  private constructor () {
    this.loggerTransport = [new winston.transports.Console(this.settings.config)]
    this.logger = winston.createLogger({
      transports: this.loggerTransport,
      exitOnError: false
    })
  }

  static callLogger (): Logger {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  public error (text: string): string {
    const res = this.logger.error(text)
    return res
  }

  public info (text: string): string {
    const res: string = this.logger.info(text)
    return res
  }

  public debug (text: string): string {
    const res = this.logger.debug(text)
    return res
  }
}
