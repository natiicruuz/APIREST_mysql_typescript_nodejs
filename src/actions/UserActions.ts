/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type UserRepository } from '../data/IndexData'
import { type Logger, type Exception, type Nullable, type Uuid } from '../utils/indexUtils'
import bcrypt from 'bcrypt'

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

  async getUser (page: number, limit: number): Promise<any> {
    this.logger.info('[UserAction][getUser] -> starting...')

    const result = await this.userRepository.getUser(page, limit)

    this.logger.info('[UserAction][getUser] -> end.')
    return result
  }

  async getUserByUuid (userUuid: string): Promise<any> {
    this.logger.info('[UserAction][getUserByUuid] -> starting...')
    let user
    if (userUuid !== undefined || userUuid !== null) {
      user = await this.userRepository.getUserByUuid(userUuid)
    } else {
      user = null
    }
    this.logger.info('[UserAction][getUserByUuid] -> end.')

    return user
  }

  async createUser (user: any): Promise<Nullable<any>> {
    this.logger.info('[UserAction][create] -> starting...')
    console.log('user', user)
    let newUser: any
    if (
      user === null ||
        user === undefined ||
        Object.keys(user).length === 0
    ) {
      newUser = null
    } else {
      const uuidCategory = this.uuidGenerator.generate()
      user.uuid = uuidCategory
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(user.password, salt)
      user.password = hashPassword
      newUser = await this.userRepository.createUser(user)
    }
    this.logger.info('[UserAction][create] -> end.')
    const { password, ...rest } = newUser
    return rest
  }

  async updateUser (uuid: string, user: any): Promise<Nullable<any>> {
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
  }

  public async deleteUser (uuid: string): Promise<Nullable<boolean>> {
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
  }

  public async getUserByEmail (email: string): Promise<Nullable<any>> {
    this.logger.info('[UserAction][getUserByEmail] -> starting...')

    const result = await this.userRepository.getUserByEmail(email)
    this.logger.info('[UserAction][getUserByEmail] -> end.')
    console.log('result: ', result)
    return result
  }
}
