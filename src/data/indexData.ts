import { logger, exception } from '../utils/indexUtils'
import CarModel from '../models/carModel'
import CarRepository from './carRepository'

const carRepository = new CarRepository(CarModel, logger, exception)

export { carRepository, CarRepository }
