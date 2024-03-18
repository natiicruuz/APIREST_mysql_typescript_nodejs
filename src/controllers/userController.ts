/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type UserActions } from 'actions/indexActions'
import { type Request, type Response } from 'express'
import { type Logger, type Exception, type ResponseFormat } from '../utils/indexUtils'

export class UserController {
  private readonly userAction: UserActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly responseFormat: ResponseFormat

  constructor (
    userAction: UserActions,
    logger: Logger,
    exception: Exception,
    responseFormat: ResponseFormat
  ) {
    this.userAction = userAction
    this.logger = logger
    this.exception = exception
    this.responseFormat = responseFormat

    this.getUser = this.getUser.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  public async getUser (req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userAction.getUser()
      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path

      const response = await this.responseFormat.run(result, protocol, host, path, 200)

      res.json(response)
    } catch (error) {
      console.log(error)
    }
  }

  public async createUser (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[UserController][createUser] -> starting...')

      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path

      const { name, email, password, isAdmin } = req.body

      const user = { name, email, password, isAdmin }
      const newUser = await this.userAction.createUser(user)

      let result

      if (newUser === null) {
        result = null
        res
          .status(404)
          .send('Error: user was not created, please insert valid inputs.')
      }

      result = await this.responseFormat.run(newUser, protocol, host, path, 200)

      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateUser (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[UserController][updateUser] -> starting...')
      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path
      const uuid = req.params.uuid

      const user = { ...req.body }

      const userUpdated = await this.userAction.updateUser(uuid, user)
      let result
      if (userUpdated === null) {
        result = await this.responseFormat.run(
          ['User has not been updated.'],
          protocol,
          host,
          path,
          404
        )
        res.status(404)
      } else {
        result = await this.responseFormat.run(['User has been updated successfully.'], protocol, host, path, 200)
        res.status(200)
      }

      this.logger.info('[UserController][update] -> end.')
      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteUser (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[UserController][deleteUser] -> starting...')

      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path
      const uuid = req.params.uuid

      const userDeleted = await this.userAction.deleteUser(uuid)

      let result
      if (userDeleted === null) {
        result = await this.responseFormat.run(['User has not been deleted.'], protocol, host, path, 404)
        res.status(404)
      } else {
        result = await this.responseFormat.run(['User has been deleted successfully.'], protocol, host, path, 200)
        res.status(200)
      }
      this.logger.info('[UserController][delete] -> end.')
      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
