import { logger, exception, Uuid } from '../utils/indexUtils'

import { agencyRepository, carRepository, userRepository } from '../data/indexData'
import { CarActions } from './carActions'
import { AgencyActions } from './agencyActions'
import { UserActions } from './userActions'

const carActions = new CarActions(carRepository, logger, exception, new Uuid())
const agencyActions = new AgencyActions(agencyRepository, logger, exception, new Uuid())
const userActions = new UserActions(userRepository, logger, exception, new Uuid())

export { carActions, CarActions, agencyActions, AgencyActions, userActions, UserActions }
