/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type UserRepository } from 'data/indexData'
import {
  type Logger,
  type Exception,
  type Nullable,
  type Uuid
} from '../utils/indexUtils'

export class UserActions {
  private readonly userRepository: UserRepository
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly uuidGenerator!: Uuid

  constructor (
    userRepository: UserRepository,
    logger: Logger,
    exception: Exception,
    uuidGenerator: Uuid
  ) {
    this.userRepository = userRepository
    this.logger = logger
    this.exception = exception
    this.uuidGenerator = uuidGenerator
  }

  async getUser (this: any): Promise<any> {
    const result = await this.userRepository.getUser()
    return result
  }

  async createUser (user: any): Promise<Nullable<any>> {
    try {
      this.logger.info('[UserAction][create] -> starting...')
      let newUser
      if (
        user === null ||
        user === undefined ||
        Object.keys(user).length === 0
      ) {
        newUser = null
      } else {
        const uuidCategory = this.uuidGenerator.generate()
        user.uuid = uuidCategory
        newUser = await this.userRepository.createUser(user)
      }
      this.logger.info('[UserAction][create] -> end.')
      return newUser
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  async updateUser (uuid: string, user: any): Promise<Nullable<any>> {
    try {
      this.logger.info('[UserAction][update] -> starting...')
      let userUpdated
      console.log(uuid)
      if (
        (uuid !== null || uuid !== undefined) &&
        (user !== null || user !== undefined)
      ) {
        userUpdated = await this.userRepository.updateUser(uuid, user)
      } else {
        userUpdated = null
      }
      this.logger.info('[UserAction][update] -> end.')
      return userUpdated
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteUser (uuid: string): Promise<Nullable<boolean>> {
    try {
      this.logger.info('[UserAction][delete] -> starting...')
      let userDeleted

      if (uuid === null || uuid === undefined) {
        userDeleted = null
      } else {
        userDeleted = await this.userRepository.deleteUser(uuid)
      }

      this.logger.info('[UserAction][delete] -> end.')
      console.log('user deleted: ', userDeleted)
      return userDeleted
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
