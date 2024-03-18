import { logger, exception } from '../utils/indexUtils'
import CarModel from '../models/carModel'
import AgencyModel from '../models/agencyModel'
import UserModel from '../models/userModel'

import CarRepository from './carRepository'
import AgencyRepository from './agencyRepository'
import UserRepository from './userRepository'

const carRepository = new CarRepository(CarModel, logger, exception)
const agencyRepository = new AgencyRepository(AgencyModel, logger, exception)
const userRepository = new UserRepository(UserModel, logger, exception)

export { carRepository,
  CarRepository,
  agencyRepository,
  AgencyRepository,
  userRepository,
  UserRepository }
