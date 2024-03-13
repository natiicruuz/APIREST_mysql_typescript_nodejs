import path from 'path'
import * as dotenv from 'dotenv'
import { BackendApp } from './BackendApp'
import { logger } from '../utils/indexUtils'
import { env } from './../config/env'
import { Server } from './Server'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  const server = new Server(env.PORT)
  void new BackendApp(server).start()
} catch (error) {
  logger.error(error as string)
}
