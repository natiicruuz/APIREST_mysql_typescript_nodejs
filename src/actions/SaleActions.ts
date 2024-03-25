/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type SaleRepository } from 'data/IndexData'
import {
  type Logger,
  type Exception,
  type Nullable,
  type Uuid
} from '../utils/indexUtils'

export class SaleActions {
  private readonly saleRepository: SaleRepository
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly uuidGenerator!: Uuid

  constructor (
    saleRepository: SaleRepository,
    logger: Logger,
    exception: Exception,
    uuidGenerator: Uuid
  ) {
    this.saleRepository = saleRepository
    this.logger = logger
    this.exception = exception
    this.uuidGenerator = uuidGenerator
  }

  async getSale (page: number, limit: number): Promise<any> {
    this.logger.info('[SaleAction][getSale] -> starting...')

    const result = await this.saleRepository.getSale(page, limit)

    this.logger.info('[SaleAction][getSale] -> end.')
    return result
  }

  async getSaleByUuid (saleUuid: string): Promise<any> {
    this.logger.info('[SaleAction][getSaleByUuid] -> starting...')
    let sale
    if (saleUuid !== undefined || saleUuid !== null) {
      sale = await this.saleRepository.getSaleByUuid(saleUuid)
    } else {
      sale = null
    }
    this.logger.info('[SaleAction][getSaleByUuid] -> end.')

    return sale
  }

  async createSale (sale: any): Promise<Nullable<any>> {
    this.logger.info('[SaleAction][create] -> starting...')
    let newSale
    if (
      sale === null ||
        sale === undefined ||
        Object.keys(sale).length === 0
    ) {
      newSale = null
    } else {
      const uuidCategory = this.uuidGenerator.generate()
      sale.uuid = uuidCategory
      newSale = await this.saleRepository.createSale(sale)
    }
    this.logger.info('[SaleAction][create] -> end.')
    return newSale
  }

  async updateSale (uuid: string, sale: any): Promise<Nullable<any>> {
    this.logger.info('[SaleAction][update] -> starting...')
    let saleUpdated
    console.log(uuid)
    if (
      (uuid !== null || uuid !== undefined) &&
        (sale !== null || sale !== undefined)
    ) {
      saleUpdated = await this.saleRepository.updateSale(uuid, sale)
    } else {
      saleUpdated = null
    }
    this.logger.info('[SaleAction][update] -> end.')
    return saleUpdated
  }

  public async deleteSale (uuid: string): Promise<Nullable<boolean>> {
    this.logger.info('[SaleAction][delete] -> starting...')
    let saleDeleted

    if (uuid === null || uuid === undefined) {
      saleDeleted = null
    } else {
      saleDeleted = await this.saleRepository.deleteSale(uuid)
    }

    this.logger.info('[SaleAction][delete] -> end.')
    console.log('sale deleted: ', saleDeleted)
    return saleDeleted
  }
}
