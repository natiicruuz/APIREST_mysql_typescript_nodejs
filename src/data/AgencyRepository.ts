import { type IAgencyPaginated } from 'interfaces/IAgencyPaginated'
import type AgencyModel from '../models/AgencyModel'
import { agencyHasManyCarsModel, agencyHasManySalesModel } from '../models/IndexModels'

import { type Logger, type Exception, type Nullable, Date } from '../utils/indexUtils'
import { type IPagination } from 'interfaces/IPagination'

export default class AgencyRepository {
  private readonly agencyModel: any
  private readonly logger: Logger
  private readonly exception: Exception

  constructor (agencyModel: any, logger: Logger, exception: Exception) {
    this.agencyModel = agencyModel
    this.logger = logger
    this.exception = exception
  }

  public async getAgency (page: number, limit: number): Promise<Nullable<IAgencyPaginated>> {
    try {
      this.logger.info('[AgencyRepository][getAgency] -> starting...')

      const skip = (page - 1) * limit

      const { rows: result, count } = await this.agencyModel.findAndCountAll({
        attributes: [
          'id',
          'uuid',
          'name',
          ['created_at', 'createdAt'],
          ['updated_at', 'updatedAt'],
          ['deleted_at', 'deletedAt']
        ],
        include: [
          {
            association: agencyHasManyCarsModel,
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
            ]
          },
          {
            association: agencyHasManySalesModel,
            attributes: [
              'id',
              'uuid',
              'ownerId',
              'price',
              ['created_at', 'createdAt'],
              ['updated_at', 'updatedAt'],
              ['deleted_at', 'deletedAt']
            ]
          }
        ],
        offset: skip,
        limit
      })

      const calculoPag = Math.ceil(count / limit)
      const totalPages = calculoPag >= 0 ? calculoPag : 1

      const pagination: IPagination = {
        total: count,
        perPage: limit,
        currentPage: (page !== 0) ? +page : 0,
        totalPages
      }

      this.logger.info('[AgencyRepository][getAgency] -> end.')
      return {
        result,
        pagination
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async getAgencyByUuid (agencyUuid: string): Promise<Nullable<AgencyModel>> {
    try {
      this.logger.info('[AgencyRepository][getAgencyByUuid] -> starting...')
      let response
      if (agencyUuid !== null || agencyUuid === undefined) {
        const agency = await this.agencyModel.findAll({
          attributes: ['id', 'uuid', 'name', ['created_at', 'createdAt'], ['updated_at', 'updatedAt'], ['deleted_at', 'deletedAt']],
          where: { uuid: agencyUuid }
        })

        const { dataValues } = agency[0]
        response = dataValues
      } else {
        response = null
      }
      this.logger.info('[AgencyRepository][getAgencyByUuid] -> end.')
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async createAgency (agencyCreation: any): Promise<Nullable<AgencyModel>> {
    try {
      this.logger.info('[AgencyRepository][create] -> starting...')
      const { uuid, name } = agencyCreation

      const result = await this.agencyModel.create({ uuid, name })

      this.logger.info('[AgencyRepository][create] -> end.')
      return result
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateAgency (agencyUuid: string, agencyUpdate: any): Promise<Nullable<AgencyModel>> {
    try {
      this.logger.info('[AgencyRepository][update] -> starting...')

      let response

      if (agencyUuid === null || agencyUuid === undefined) {
        response = null
      } else {
        const agencyUpdated = await this.agencyModel
          .update(agencyUpdate, {
            where: {
              uuid: agencyUuid
            },
            updated_at: new Date()
          })
          .then(() => {
            return this.agencyModel.findAll({
              attributes: [
                'uuid',
                'name',
                ['created_at', 'createdAt'],
                ['updated_at', 'updatedAt']
              ],
              where: {
                uuid: agencyUuid
              }
            })
          })
        response = agencyUpdated
      }

      this.logger.info('[AgencyRepository][update] -> end.')
      return response
    } catch (error) {
      this.logger.error(`[AgencyRepository][update] -> ${error as string}`)
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteAgency (agencyUuid: string): Promise<Nullable<boolean>> {
    try {
      this.logger.info(`[AgencyRepository][delete][${agencyUuid}] -> starting...`)
      let result
      console.log('agency uuid; ', agencyUuid)

      if (agencyUuid !== null || agencyUuid !== undefined) {
        const agencyDeleted = await this.agencyModel
          .destroy({
            where: {
              uuid: agencyUuid
            }
          })
          .then(() => {
            return this.agencyModel.findAll({ where: { uuid: agencyUuid } })
          })

        if (agencyDeleted.length === 0) {
          result = true
          this.logger.info(`[AgencyRepository][delete] [${agencyUuid}] -> end.`)
        } else {
          result = false
          this.logger.info('[AgencyRepository][delete] agency doesnt exist -> end.')
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
