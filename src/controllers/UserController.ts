/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type UserActions } from 'actions/IndexActions'
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
    this.getUserByUuid = this.getUserByUuid.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  public async getUser (req: Request, res: Response): Promise<void> {
    const pageNumber = parseInt(req.query.page as string ?? '1', 10)
    const size = parseInt(req.query.limit as string ?? '100', 10)

    const result = await this.userAction.getUser(pageNumber, size)
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path

    const response = await this.responseFormat.run(result, protocol, host, path, 200)

    res.json(response)
  }

  public async getUserByUuid (req: Request, res: Response): Promise<void> {
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid
    this.logger.info('[UserController][getUserByUuid] -> starting...')

    const user = await this.userAction.getUserByUuid(uuid)

    let result
    if (user === null) {
      result = await this.responseFormat.run(['User not found.'], protocol, host, path, 404)
      res.status(404)
    } else {
      result = await this.responseFormat.run([user], protocol, host, path, 200)
      res.status(200)
    }

    this.logger.info('[UserController][getUserByUuid] -> end.')

    res.json(result)
  }

  public async createUser (req: Request, res: Response): Promise<void> {
    this.logger.info('[UserController][createUser] -> starting...')

    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path

    const { name, email, password, isAdmin } = req.body

    const user = { name, email, password, isAdmin }
    console.log('user: ', user)
    const newUser = await this.userAction.createUser(user)
    console.log('newUser', newUser)
    let result

    if (newUser === null) {
      result = null
      res
        .status(404)
        .send('Error: user was not created, please insert valid inputs.')
    }

    result = await this.responseFormat.run(newUser, protocol, host, path, 200)

    res.json(result)
  }

  public async updateUser (req: Request, res: Response): Promise<void> {
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
  }

  public async deleteUser (req: Request, res: Response): Promise<void> {
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
  }
}
