import { type IPagination } from '../interfaces/IPagination'
import type SaleModel from '../models/SaleModel'

export interface ISalePaginated {
  result?: SaleModel[]
  pagination?: IPagination
}
