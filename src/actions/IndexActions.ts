import { logger, exception, Uuid } from '../utils/indexUtils'

import {
  agencyRepository,
  carRepository,
  userRepository,
  saleRepository
} from '../data/IndexData'
import { CarActions } from './CarActions'
import { AgencyActions } from './AgencyActions'
import { UserActions } from './UserActions'
import { AuthActions } from './AuthActions'
import { SaleActions } from './SaleActions'

const carActions = new CarActions(carRepository, logger, exception, new Uuid())
const agencyActions = new AgencyActions(
  agencyRepository,
  logger,
  exception,
  new Uuid()
)
const userActions = new UserActions(
  userRepository,
  logger,
  exception,
  new Uuid()
)
const authActions = new AuthActions(userActions, logger, exception, new Uuid())
const saleActions = new SaleActions(
  saleRepository,
  logger,
  exception,
  new Uuid()
)

export {
  carActions,
  CarActions,
  agencyActions,
  AgencyActions,
  userActions,
  UserActions,
  saleActions,
  SaleActions,
  authActions,
  AuthActions
}
