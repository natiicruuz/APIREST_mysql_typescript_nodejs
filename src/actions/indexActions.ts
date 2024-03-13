import { logger, exception } from '../utils/indexUtils'

import { carRepository } from '../data/indexData'
import { CarActions } from './carActions'

const carActions = new CarActions(carRepository, logger, exception)

export { carActions, CarActions }
