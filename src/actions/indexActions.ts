import { logger, exception, Uuid } from '../utils/indexUtils'

import { carRepository } from '../data/indexData'
import { CarActions } from './carActions'

const carActions = new CarActions(carRepository, logger, exception, new Uuid())

export { carActions, CarActions }
