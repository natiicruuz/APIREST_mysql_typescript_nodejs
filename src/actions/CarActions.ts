/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type CarRepository } from 'data/IndexData'
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

  async getCar (page: number, limit: number): Promise<any> {
    this.logger.info('[CarAction][getCar] -> starting...')

    const result = await this.carRepository.getCar(page, limit)

    this.logger.info('[CarAction][getCar] -> end.')
    return result
  }

  async getCarByUuid (carUuid: string): Promise<any> {
    this.logger.info('[CarAction][getCarByUuid] -> starting...')
    let car
    if (carUuid !== undefined || carUuid !== null) {
      car = await this.carRepository.getCarByUuid(carUuid)
    } else {
      car = null
    }
    this.logger.info('[CarAction][getCarByUuid] -> end.')

    return car
  }

  async createCar (car: any): Promise<Nullable<any>> {
    this.logger.info('[CarAction][create] -> starting...')
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
  }

  async updateCar (uuid: string, car: any): Promise<Nullable<any>> {
    this.logger.info('[CarAction][update] -> starting...')
    let carUpdated
    console.log(uuid)
    if ((uuid !== null || uuid !== undefined) && (car !== null || car !== undefined)) {
      carUpdated = await this.carRepository.updateCar(uuid, car)
    } else {
      carUpdated = null
    }
    this.logger.info('[CarAction][update] -> end.')
    return carUpdated
  }

  public async deleteCar (uuid: string): Promise<Nullable<boolean>> {
    this.logger.info('[CarAction][delete] -> starting...')
    let carDeleted

    if (uuid === null || uuid === undefined) {
      carDeleted = null
    } else {
      carDeleted = await this.carRepository.deleteCar(uuid)
    }

    this.logger.info('[CarAction][delete] -> end.')
    console.log('car deleted: ', carDeleted)
    return carDeleted
  }
}
