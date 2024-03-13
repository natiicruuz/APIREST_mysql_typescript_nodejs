import moment from 'moment-timezone'

export class Date {
  readonly sysDate: any

  constructor () {
    this.sysDate = moment().tz('Europe/Madrid').format()
  }

  getSysDate (): Date {
    return this.sysDate
  }

  getSysDateString (): string {
    return this.sysDate.toString()
  }
}
