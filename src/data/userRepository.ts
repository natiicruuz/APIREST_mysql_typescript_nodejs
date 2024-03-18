import type UserModel from '../models/userModel'
import { type Logger, type Exception, type Nullable, Date } from '../utils/indexUtils'

export default class UserRepository {
  private readonly userModel: any
  private readonly logger: Logger
  private readonly exception: Exception

  constructor (userModel: any, logger: Logger, exception: Exception) {
    this.userModel = userModel
    this.logger = logger
    this.exception = exception
  }

  public async getUser (): Promise<Nullable<UserModel[]>> {
    const result = await this.userModel.findAll()
    return result
  }

  public async createUser (userCreation: any): Promise<Nullable<UserModel>> {
    try {
      this.logger.info('[UserRepository][create] -> starting...')

      const { uuid, name, email, password, isAdmin } = userCreation

      const result = await this.userModel.create({ uuid, name, email, password, isAdmin })

      this.logger.info('[UserRepository][create] -> end.')
      return result
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
      this.logger.info(
        `[UserRepository][delete][${userUuid}] -> starting...`
      )
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
          this.logger.info(
            `[UserRepository][delete] [${userUuid}] -> end.`
          )
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
}
