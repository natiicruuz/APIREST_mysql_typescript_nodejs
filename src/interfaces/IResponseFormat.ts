export interface ILinks {
  self: string
}

export interface IEmbedded {
  detail: any[] | null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IPagination {
  total: number
  perPage: number
  currentPage: number
  totalPages: number
}

export interface IBody {
  _links: ILinks
  _embedded: IEmbedded
  pagination?: IPagination | null
}

export interface IResponseFormat {
  statusCode: number
  body: IBody
}
