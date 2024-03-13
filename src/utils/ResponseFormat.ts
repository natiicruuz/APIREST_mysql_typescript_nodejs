export class ResponseFormat {
  static instance: ResponseFormat

  private constructor () { }

  static callResponseFormat (): ResponseFormat {
    ResponseFormat.instance = new ResponseFormat()

    return ResponseFormat.instance
  }

  /* async run (data: any | IFollowUpsData | ICategoryData | null, protocol: string, host: string, path: string, statusCode: number, paginator?: IPagination): Promise<IResponseFormat> {
    const users: IResponseFormat = {
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

    return users
  } */
}
