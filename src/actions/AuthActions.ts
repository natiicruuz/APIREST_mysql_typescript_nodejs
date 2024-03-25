/* eslint-disable @typescript-eslint/no-unsafe-argument */
import jwt from 'jsonwebtoken'
import { type Logger, type Exception, type Uuid } from '../utils/indexUtils'
import { type UserActions } from './UserActions'
import bcrypt from 'bcrypt'
import { env } from '../config/env'

export class AuthActions {
  private readonly userAction: UserActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly uuidGenerator!: Uuid

  constructor (
    userAction: UserActions,
    logger: Logger,
    exception: Exception,
    uuidGenerator: Uuid
  ) {
    this.userAction = userAction
    this.logger = logger
    this.exception = exception
    this.uuidGenerator = uuidGenerator
  }

  async login (email: any, password: any): Promise<any> {
    try {
      this.logger.info('[AuthAction][login] -> starting...')

      // #1 ir a buscar al user por su email
      const foundUser = await this.userAction.getUserByEmail(email)
      console.log('foundUser', foundUser)
      if (foundUser === false) {
        throw new Error('Email is not correct')
      }
      // #2 validar la contrasena
      const isMatch = bcrypt.compareSync(password, foundUser.password)
      console.log('isMatch', isMatch)
      if (isMatch) {
        // #3 se genera el token con los datos del usuario
        const token = jwt.sign({
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin
        }, env.JWT_SECRET_KEY)
        this.logger.info('[AuthAction][login] -> end..')
        console.log(token)
        return token
      } else {
        throw new Error('Password is not correct')
      }
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
