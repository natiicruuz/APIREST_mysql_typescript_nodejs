import type UserModel from '../models/CarModel'
import { type IPagination } from '../interfaces/IPagination'

export interface IUserPaginated {
  result?: UserModel[]
  pagination?: IPagination
}
