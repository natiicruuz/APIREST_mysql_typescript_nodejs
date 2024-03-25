import { type ICarPaginated } from '../interfaces/ICarPaginated'
import { type IPagination } from '../interfaces/IResponseFormat'
import type CarModel from '../models/CarModel'
import {
  type Logger,
  type Exception,
  type Nullable,
  Date
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

  public async getCar (
    page: number,
    limit: number
  ): Promise<Nullable<ICarPaginated>> {
    try {
      this.logger.info('[CarRepository][getCar] -> starting...')

      const skip = (page - 1) * limit

      const { rows: result, count } = await this.carModel.findAndCountAll({
        offset: skip,
        limit
      })
      const calculoPag = Math.ceil(count / limit)
      const totalPages = calculoPag >= 0 ? calculoPag : 1

      const pagination: IPagination = {
        total: count,
        perPage: limit,
        currentPage: page !== 0 ? +page : 0,
        totalPages
      }

      this.logger.info('[CarRepository][getCar] -> end.')

      return {
        result,
        pagination
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async getCarByUuid (carUuid: string): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CarRepository][getCarByUuid] -> starting...')
      let response
      if (carUuid !== null || carUuid === undefined) {
        const car = await this.carModel.findAll({
          attributes: [
            'id',
            'uuid',
            'name',
            'model',
            'year',
            'price',
            ['created_at', 'createdAt'],
            ['updated_at', 'updatedAt'],
            ['deleted_at', 'deletedAt']
          ],
          where: { uuid: carUuid }
        })

        const { dataValues } = car[0]
        response = dataValues
      } else {
        response = null
      }
      this.logger.info('[CarRepository][getCarByUuid] -> end.')
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async createCar (carCreation: any): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CarRepository][create] -> starting...')
      const { uuid, name, model, year, price, agencyId } = carCreation

      const result = await this.carModel.create({
        uuid,
        name,
        model,
        year,
        price,
        agencyId
      })

      this.logger.info('[CarRepository][create] -> end.')
      return result
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateCar (
    carUuid: string,
    carUpdate: any
  ): Promise<Nullable<CarModel>> {
    try {
      this.logger.info('[CarRepository][update] -> starting...')

      let response

      if (carUuid === null || carUuid === undefined) {
        response = null
      } else {
        const carUpdated = await this.carModel
          .update(carUpdate, {
            where: {
              uuid: carUuid
            },
            updated_at: new Date()
          })
          .then(() => {
            return this.carModel.findAll({
              attributes: [
                'uuid',
                'name',
                'model',
                'year',
                'price',
                ['created_at', 'createdAt'],
                ['updated_at', 'updatedAt']
              ],
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
          .destroy({
            where: {
              uuid: carUuid
            }
          })
          .then(() => {
            return this.carModel.findAll({ where: { uuid: carUuid } })
          })

        if (carDeleted.length === 0) {
          result = true
          this.logger.info(`[CarRepository][delete] [${carUuid}] -> end.`)
        } else {
          result = false
          this.logger.info('[CarRepository][delete] car doesnt exist -> end.')
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
