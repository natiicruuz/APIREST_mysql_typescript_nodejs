import { logger, exception, responseFormat } from '../utils/indexUtils'

import { CarController } from './carController'
import { carActions } from '../actions/indexActions'

const carController = new CarController(carActions, logger, exception, responseFormat)

export { carController, CarController }
