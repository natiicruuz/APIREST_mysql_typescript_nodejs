import { logger, exception, responseFormat } from '../utils/indexUtils'

import { CarController } from './carController'
import { AgencyController } from './agencyController'
import { UserController } from './userController'

import { agencyActions, carActions, userActions } from '../actions/indexActions'

const carController = new CarController(carActions, logger, exception, responseFormat)
const agencyController = new AgencyController(agencyActions, logger, exception, responseFormat)
const userController = new UserController(userActions, logger, exception, responseFormat)

export { carController, CarController, agencyController, AgencyController, userController, UserController }
