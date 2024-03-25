/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type AuthActions } from 'actions/IndexActions'
import { type Request, type Response } from 'express'
import {
  type Logger,
  type Exception,
  type ResponseFormat
} from '../utils/indexUtils'

export class AuthController {
  private readonly authAction: AuthActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly responseFormat: ResponseFormat

  constructor (
    authAction: AuthActions,
    logger: Logger,
    exception: Exception,
    responseFormat: ResponseFormat
  ) {
    this.authAction = authAction
    this.logger = logger
    this.exception = exception
    this.responseFormat = responseFormat

    this.login = this.login.bind(this)
  }

  public async login (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[AuthController][login] -> starting...')

      const result = await this.authAction.login(req.body.email, req.body.password)
      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path

      const response = await this.responseFormat.run(
        result,
        protocol,
        host,
        path,
        200
      )
      this.logger.info('[AuthController][login] -> end.')

      res.json(response)
    } catch (error) {
      console.log(error)
    }
  }
}
