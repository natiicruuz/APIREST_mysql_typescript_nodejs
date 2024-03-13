/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type CarRepository } from 'data/indexData'
import { type Logger, type Exception, type Nullable, type Uuid } from '../utils/indexUtils'

export class CarActions {
  private readonly carRepository: CarRepository
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly uuidGenerator!: Uuid

  constructor (carRepository: CarRepository, logger: Logger, exception: Exception, uuidGenerator: Uuid) {
    this.carRepository = carRepository
    this.logger = logger
    this.exception = exception
    this.uuidGenerator = uuidGenerator
  }

  async getCar (this: any): Promise<any> {
    const result = await this.carRepository.getCar()
    return result
  }

  async createCar (car: any): Promise<Nullable<any>> {
    try {
      this.logger.info('[CategoryAction][create] -> starting...')
      let newCar
      if (car === null || car === undefined || Object.keys(car).length === 0) {
        newCar = null
      } else {
        const uuidCategory = this.uuidGenerator.generate()
        car.uuid = uuidCategory
        newCar = await this.carRepository.createCar(car)
      }
      this.logger.info('[CarAction][create] -> end.')
      return newCar
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  async updateCar (uuidGenerator: string, car: any): Promise<Nullable<any>> {
    try {
      this.logger.info('[CategoryAction][update] -> starting...')
      let carUpdated
      if ((uuidGenerator !== null || uuidGenerator !== undefined) && (car !== null || car !== undefined)) {
        carUpdated = await this.carRepository.updateCar(uuidGenerator, car)
      } else {
        carUpdated = null
      }
      this.logger.info('[CarAction][create] -> end.')
      return carUpdated
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}