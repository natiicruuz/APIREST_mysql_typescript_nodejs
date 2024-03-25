import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import { env } from '../config/env'
import { userActions } from '../actions/IndexActions'
import { type Logger } from '../utils/indexUtils'

export class AuthMiddleware {
  private readonly logger: Logger

  constructor (logger: Logger) {
    this.logger = logger
    this.authenticate = this.authenticate.bind(this)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async authenticate (req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info('[AuthMiddleware][authenticate] -> starting...')

      const token = req.header('Authorization')?.replace('Bearer ', '')
      if (token === null || token === undefined) {
        res.status(401).json('Not authorized, token not found')
        throw new Error('Not authorized, token not found')
      }
      const decoded: any = jwt.verify(token, env.JWT_SECRET_KEY)
      if (decoded === null) {
        res.status(401).json('Not authorized, userId not found')
        throw new Error('Not authorized, userId not found')
      }
      const userInfo = await userActions.getUserByEmail(
        decoded.email as string
      )
      if (userInfo !== null && userInfo.isAdmin !== true) {
        res.status(401).json('Not authorized, user not admin')
      }
      this.logger.info('[AuthMiddleware][authenticate] -> End.')

      next()
    } catch (e) {
      console.log(e)
      res.status(401).json('Not authorized, invalid token')
      throw new Error('Not authorized, invalid token')
    }
  }
}
