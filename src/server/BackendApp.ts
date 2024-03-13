import { type Server } from './Server'

export class BackendApp {
  server: Server

  constructor (server: Server) {
    this.server = server
  }

  async start (): Promise<any> {
    await this.server.listen()
  }

  async stop (): Promise<any> {
    await this.server?.stop()
  }
}
