/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type IUserPaginated } from 'interfaces/IUserPaginated'
import { userHasManySalesModel } from '../models/IndexModels'

import type UserModel from '../models/UserModel'
import {
  type Logger,
  type Exception,
  type Nullable,
  Date
} from '../utils/indexUtils'
import { type IPagination } from 'interfaces/IPagination'
export default class UserRepository {
  private readonly userModel: any
  private readonly logger: Logger
  private readonly exception: Exception

  constructor (userModel: any, logger: Logger, exception: Exception) {
    this.userModel = userModel
    this.logger = logger
    this.exception = exception
  }

  public async getUser (page: number, limit: number): Promise<Nullable<IUserPaginated>> {
    try {
      this.logger.info('[UserRepository][getUser] -> starting...')

      const skip = (page - 1) * limit

      const { rows: result, count } = await this.userModel.findAndCountAll({
        attributes: [
          'id',
          'uuid',
          'name',
          'email',
          'password',
          'isAdmin',
          ['created_at', 'createdAt'],
          ['updated_at', 'updatedAt'],
          ['deleted_at', 'deletedAt']
        ],
        include: [
          {
            association: userHasManySalesModel,
            attributes: [
              'id',
              'uuid',
              ['owner_id', 'ownerId'],
              'price',
              ['agency_id', 'agencyId'],
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
      this.logger.info('[UserRepository][getUser] -> end.')

      return {
        result,
        pagination
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async getUserByUuid (userUuid: string): Promise<Nullable<UserModel>> {
    try {
      this.logger.info('[UserRepository][getUserByUuid] -> starting...')
      let response
      if (userUuid !== null || userUuid === undefined) {
        const user = await this.userModel.findAll({
          attributes: ['id', 'uuid', 'name', 'email', 'isAdmin', ['created_at', 'createdAt'], ['updated_at', 'updatedAt'], ['deleted_at', 'deletedAt']],
          where: { uuid: userUuid }
        })

        const { dataValues } = user[0]
        response = dataValues
      } else {
        response = null
      }
      this.logger.info('[UserRepository][getUserByUuid] -> end.')
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }

  public async createUser (userCreation: any): Promise<Nullable<UserModel>> {
    try {
      this.logger.info('[UserRepository][create] -> starting...')

      const { uuid, name, email, password, isAdmin } = userCreation

      const result = await this.userModel.create({
        uuid,
        name,
        email,
        password,
        isAdmin
      })
      console.log(result)
      this.logger.info('[UserRepository][create] -> end.')
      return result.dataValues
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateUser (
    userUuid: string,
    userUpdate: any
  ): Promise<Nullable<UserModel>> {
    try {
      this.logger.info('[UserRepository][update] -> starting...')

      let response

      if (userUuid === null || userUuid === undefined) {
        response = null
      } else {
        const userUpdated = await this.userModel
          .update(userUpdate, {
            where: {
              uuid: userUuid
            },
            updated_at: new Date()
          })
          .then(() => {
            return this.userModel.findAll({
              attributes: [
                'uuid',
                'name',
                'email',
                'password',
                'isAdmin',
                ['created_at', 'createdAt'],
                ['updated_at', 'updatedAt']
              ],
              where: {
                uuid: userUuid
              }
            })
          })
        response = userUpdated
      }

      this.logger.info('[UserRepository][update] -> end.')
      return response
    } catch (error) {
      this.logger.error(`[UserRepository][update] -> ${error as string}`)
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteUser (userUuid: string): Promise<Nullable<boolean>> {
    try {
      this.logger.info(`[UserRepository][delete][${userUuid}] -> starting...`)
      let result
      console.log('user uuid; ', userUuid)

      if (userUuid !== null || userUuid !== undefined) {
        const userDeleted = await this.userModel
          .destroy({
            where: {
              uuid: userUuid
            }
          })
          .then(() => {
            return this.userModel.findAll({ where: { uuid: userUuid } })
          })

        if (userDeleted.length === 0) {
          result = true
          this.logger.info(`[UserRepository][delete] [${userUuid}] -> end.`)
        } else {
          result = false
          this.logger.info(
            '[UserRepository][delete] user doesnt exist -> end.'
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

  public async getUserByEmail (userEmail: string): Promise<Nullable<UserModel>> {
    try {
      this.logger.info('[UserRepository][getUserByEmail] -> starting...')

      const response = await this.userModel.findOne({ email: userEmail })

      this.logger.info('[UserRepository][getUserByEmail] -> end.')
      return response
    } catch (error) {
      this.logger.error(
        `[UserRepository][getUserByEmail] -> ${error as string}`
      )
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
