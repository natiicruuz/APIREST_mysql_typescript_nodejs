import type CarModel from '../models/carModel'
import {
  type Logger,
  type Exception,
  type Nullable
} from '../utils/indexUtils'

export default class CarRepository {
  private readonly carModel: any
  private readonly logger: Logger
  private readonly exception: Exception

  constructor (carModel: any, logger: Logger, exception: Exception) {
    this.carModel = carModel
    this.logger = logger
    this.exception = exception
  }

  public async getCar (): Promise<Nullable<CarModel[]>> {
    const result = await this.carModel.findAll()
    return result
  }

  public async createCar (carCreation: any): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CategoryRepository][create] -> starting...')
      const { uuid, name, model, year } = carCreation

      const result = await this.carModel.create({
        uuid,
        name,
        model,
        year
      })

      this.logger.info('[CategoryRepository][create] -> end.')
      return result
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateCar (carUuid: string, carUpdate: any): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CategoryRepository][update] -> starting...')

      let response

      if (carUuid === null || carUuid === undefined) {
        response = null
      } else {
        const carUpdated = await this.carModel.update(carUpdate, {
          where: {
            uuid: carUuid
          }
        })
          .then(() => {
            return this.carModel.findAll({
              attributes: ['uuid', 'name', 'model', 'year', ['created_at', 'createdAt'], ['updated_at', 'updatedAt']],
              where: {
                uuid: carUuid
              }
            })
          })

        const {
          id,
          createdAt,
          deletedAt,
          ...rest
        } = carUpdated[0]?.dataValues
        response = rest
      }

      this.logger.info('[CategoryRepository][update] -> end.')
      return response
    } catch (error) {
      this.logger.error(`[CategoryRepository][update] -> ${error as string}`)
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteCar (carUuid: string): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CategoryRepository][delete] -> starting...')

      let response = null

      if (carUuid !== null) {
        response = await this.carModel.delete()
          .then(() => {
            return this.carModel.findAll({ where: { uuid: carUuid } })
          })
      }

      return response
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
