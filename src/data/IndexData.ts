import { logger, exception } from '../utils/indexUtils'
import CarModel from '../models/CarModel'
import AgencyModel from '../models/AgencyModel'
import UserModel from '../models/UserModel'
import SaleModel from '../models/SaleModel'

import CarRepository from './CarRepository'
import AgencyRepository from './AgencyRepository'
import UserRepository from './UserRepository'
import SaleRepository from './SaleRepository'

const carRepository = new CarRepository(CarModel, logger, exception)
const agencyRepository = new AgencyRepository(AgencyModel, logger, exception)
const userRepository = new UserRepository(UserModel, logger, exception)
const saleRepository = new SaleRepository(SaleModel, logger, exception)

export { carRepository,
  CarRepository,
  agencyRepository,
  AgencyRepository,
  userRepository,
  UserRepository,
  saleRepository,
  SaleRepository }
