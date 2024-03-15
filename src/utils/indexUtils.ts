import moment from 'moment'

import { Logger } from './Logger'
import { Exception } from './Exceptions'
import { ResponseFormat } from './ResponseFormat'
import { Uuid } from './Uuid'
import { type Nullable } from './Nullable'
import { Date } from './Date'

const logger = Logger.callLogger()
const exception = Exception.callException('')
const responseFormat = ResponseFormat.callResponseFormat()

export {
  Logger,
  logger,
  moment,
  exception,
  Exception,
  responseFormat,
  ResponseFormat,
  Uuid,
  type Nullable,
  Date
}
