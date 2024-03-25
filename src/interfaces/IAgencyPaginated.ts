import type AgencyModel from '../models/CarModel'
import { type IPagination } from '../interfaces/IPagination'

export interface IAgencyPaginated {
  result?: AgencyModel[]
  pagination?: IPagination
}
