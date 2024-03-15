import type CarModel from '../models/carModel'
import { type Logger, type Exception, type Nullable, Date } from '../utils/indexUtils'

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
      this.logger.info('[CarRepository][create] -> starting...')
      const { uuid, name, model, year } = carCreation

      const result = await this.carModel.create({
        uuid,
        name,
        model,
        year
      })

      this.logger.info('[CarRepository][create] -> end.')
      return result
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateCar (carUuid: string, carUpdate: any): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CarRepository][update] -> starting...')

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
        response = carUpdated
      }

      this.logger.info('[CarRepository][update] -> end.')
      return response
    } catch (error) {
      this.logger.error(`[CarRepository][update] -> ${error as string}`)
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteCar (carUuid: string): Promise<Nullable<boolean>> {
    try {
      this.logger.info(`[CarRepository][delete][${carUuid}] -> starting...`)
      let result

      if (carUuid !== null || carUuid !== undefined) {
        const carDeleted = await this.carModel
          .update({ deleted_at: new Date() }, { where: { uuid: carUuid } })
          .then(() => {
            return this.carModel.findAll({ where: { uuid: carUuid } })
          })
          // .delete()
        if (carDeleted.length === 0) {
          result = true
          this.logger.info(`[CarRepository][delete] [${carUuid}] -> end.`)
        } else {
          result = false
          this.logger.info('[CarRepository][delete] Category dosnt exist -> end.')
        }
      } else {
        result = null
      }
      return result
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
