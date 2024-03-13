import express from 'express'
import type * as http from 'http'
import { type Logger, logger } from '../utils/indexUtils'
import routes from '../routes/indexRoutes'
import cors from 'cors'

export class Server {
  private readonly _port: string
  private readonly _app: express.Express
  private readonly _httpServer?: http.Server
  private readonly _logger: Logger

  constructor (port: string) {
    this._port = port
    this._app = express()
    this._app.use(cors())
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: false }))
    this._app.use(routes)
    this._app.enable('trust proxy')
    this._app.disable('x-powered-by')
    this._logger = logger
  }

  async listen (): Promise<void> {
    this._app.listen(this._port, async () => {
      this._logger.info(`[car_project] Listening on port ${this._port}`)
    })
  }

  async stop (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close(error => {
          if (error != null) {
            reject(error); return
          }
          resolve()
        })
      }
      resolve()
    })
  }
}
