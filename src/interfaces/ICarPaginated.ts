import type CarModel from '../models/CarModel'
import { type IPagination } from '../interfaces/IPagination'

export interface ICarPaginated {
  result?: CarModel[]
  pagination?: IPagination
}
