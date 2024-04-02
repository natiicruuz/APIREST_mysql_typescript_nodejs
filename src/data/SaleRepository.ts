import { type ISalePaginated } from '../interfaces/ISalePaginated'
import { type IPagination } from '../interfaces/IPagination'
import type SaleModel from '../models/SaleModel'
import {
  type Logger,
  type Exception,
  type Nullable,
  Date
} from '../utils/indexUtils'

export default class SaleRepository {
  private readonly saleModel: any
  private readonly logger: Logger
  private readonly exception: Exception

  constructor (saleModel: any, logger: Logger, exception: Exception) {
    this.saleModel = saleModel
    this.logger = logger
    this.exception = exception
  }

  public async getSale (page: number, limit: number): Promise<Nullable<ISalePaginated>> {
    try {
      this.logger.info('[SaleRepository][getSale] -> starting...')

      const skip = (page - 1) * limit

      const { rows: result, count } = await this.saleModel.findAndCountAll({
        offset: skip,
        limit
      })
      console.log()
      const calculoPag = Math.ceil(count / limit)
      const totalPages = calculoPag >= 0 ? calculoPag : 1

      const pagination: IPagination = {
        total: count,
        perPage: limit,
        currentPage: (page !== 0) ? +page : 0,
        totalPages
      }
      this.logger.info('[SaleRepository][getSale] -> end.')

      return {
        result,
        pagination
      }
    } catch (error) {
      console.log(error)
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async getSaleByUuid (saleUuid: string): Promise<Nullable<SaleModel>> {
    try {
      this.logger.info('[SaleRepository][getSaleByUuid] -> starting...')
      let response
      if (saleUuid !== null || saleUuid === undefined) {
        const sale = await this.saleModel.findAll({
          attributes: ['id', 'uuid', ['owner_id', 'ownerId'], 'price', ['created_at', 'createdAt'], ['updated_at', 'updatedAt'], ['deleted_at', 'deletedAt']],
          where: { uuid: saleUuid }
        })

        const { dataValues } = sale[0]
        response = dataValues
      } else {
        response = null
      }
      this.logger.info('[SaleRepository][getSaleByUuid] -> end.')
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async createSale (saleCreation: any): Promise<Nullable<SaleModel>> {
    try {
      this.logger.info('[SaleRepository][create] -> starting...')
      const { uuid, ownerId, agencyId, price } = saleCreation

      const result = await this.saleModel.create({
        uuid,
        ownerId,
        price,
        agencyId

      })

      this.logger.info('[SaleRepository][create] -> end.')
      return result
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateSale (saleUuid: string, saleUpdate: any): Promise<Nullable<SaleModel>> {
    try {
      this.logger.info('[SaleRepository][update] -> starting...')

      let response

      if (saleUuid === null || saleUuid === undefined) {
        response = null
      } else {
        const saleUpdated = await this.saleModel
          .update(saleUpdate, {
            where: {
              uuid: saleUuid
            },
            updated_at: new Date()
          })
          .then(() => {
            return this.saleModel.findAll({
              attributes: [
                'uuid',
                'ownerId',
                'agencyId',
                'price',
                ['created_at', 'createdAt'],
                ['updated_at', 'updatedAt']
              ],
              where: {
                uuid: saleUuid
              }
            })
          })
        response = saleUpdated
      }

      this.logger.info('[SaleRepository][update] -> end.')
      return response
    } catch (error) {
      this.logger.error(`[SaleRepository][update] -> ${error as string}`)
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteSale (saleUuid: string): Promise<Nullable<boolean>> {
    try {
      this.logger.info(`[SaleRepository][delete][${saleUuid}] -> starting...`)
      let result
      console.log('sale uuid; ', saleUuid)

      const receivedUuid = await this.saleModel.findAll({ where: { uuid: saleUuid } })

      if (receivedUuid.length !== 0) {
        const saleDeleted = await this.saleModel
          .destroy({
            where: {
              uuid: saleUuid
            }
          })
          .then(() => {
            return this.saleModel.findAll({ where: { uuid: saleUuid } })
          })

        if (saleDeleted.length === 0) {
          result = true
          this.logger.info(`[SaleRepository][delete] [${saleUuid}] -> end.`)
        } else {
          result = false
          this.logger.info(
            '[SaleRepository][delete] sale doesnt exist -> end.'
          )
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
