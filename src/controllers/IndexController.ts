import { logger, exception, responseFormat } from '../utils/indexUtils'

import { CarController } from './CarController'
import { AgencyController } from './AgencyController'
import { UserController } from './UserController'
import { SaleController } from './SaleController'
import { AuthController } from './AuthController'
import {
  agencyActions,
  carActions,
  userActions,
  saleActions,
  authActions
} from '../actions/IndexActions'

const carController = new CarController(
  carActions,
  logger,
  exception,
  responseFormat
)
const agencyController = new AgencyController(
  agencyActions,
  logger,
  exception,
  responseFormat
)
const userController = new UserController(
  userActions,
  logger,
  exception,
  responseFormat
)
const saleController = new SaleController(
  saleActions,
  logger,
  exception,
  responseFormat
)
const authController = new AuthController(
  authActions,
  logger,
  exception,
  responseFormat
)

export {
  carController,
  CarController,
  agencyController,
  AgencyController,
  userController,
  UserController,
  saleController,
  SaleController,
  authController,
  AuthController
}
