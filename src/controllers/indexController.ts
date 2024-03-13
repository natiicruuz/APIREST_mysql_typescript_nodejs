import { logger, exception } from '../utils/indexUtils'

import { CarController } from './carController'
import { carActions } from '../actions/indexActions'

const carController = new CarController(carActions, logger, exception)

export { carController, CarController }
