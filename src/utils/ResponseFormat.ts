import {
  type IPagination,
  type IResponseFormat
} from 'interfaces/IResponseFormat'
import { type Nullable } from './Nullable'

export class ResponseFormat {
  static instance: ResponseFormat

  private constructor () {}

  static callResponseFormat (): ResponseFormat {
    ResponseFormat.instance = new ResponseFormat()

    return ResponseFormat.instance
  }

  async run (
    data: any | null,
    protocol: string,
    host: string,
    path: string,
    statusCode: number,
    paginator?: IPagination,
    isGetAll?: boolean
  ): Promise<Nullable<IResponseFormat>> {
    let users
    if (isGetAll === true) {
      users = {
        statusCode,
        body: {
          _links: {
            self: `${protocol}://${host}${path}`
          },
          _embedded: {
            detail: data
          },
          pagination: paginator ?? {
            total: 0,
            perPage: 0,
            currentPage: 0,
            totalPages: 0
          }
        }
      }
    }

    users = {
      statusCode,
      body: {
        _links: {
          self: `${protocol}://${host}${path}`
        },
        _embedded: {
          detail: data
        }
      }
    }

    return users
  }
}
