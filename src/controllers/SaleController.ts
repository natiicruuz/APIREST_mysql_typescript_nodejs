/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type SaleActions } from 'actions/IndexActions'
import { type Request, type Response } from 'express'
import {
  type Logger,
  type Exception,
  type ResponseFormat
} from '../utils/indexUtils'

export class SaleController {
  private readonly saleAction: SaleActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly responseFormat: ResponseFormat

  constructor (
    saleAction: SaleActions,
    logger: Logger,
    exception: Exception,
    responseFormat: ResponseFormat
  ) {
    this.saleAction = saleAction
    this.logger = logger
    this.exception = exception
    this.responseFormat = responseFormat

    this.getSale = this.getSale.bind(this)
    this.getSaleByUuid = this.getSaleByUuid.bind(this)
    this.createSale = this.createSale.bind(this)
    this.updateSale = this.updateSale.bind(this)
    this.deleteSale = this.deleteSale.bind(this)
  }

  public async getSale (req: Request, res: Response): Promise<void> {
    const pageNumber = parseInt(req.query.page as string ?? '1', 10)
    const size = parseInt(req.query.limit as string ?? '100', 10)

    const result = await this.saleAction.getSale(pageNumber, size)
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path

    const response = await this.responseFormat.run(result, protocol, host, path, 200)

    res.json(response)
  }

  public async getSaleByUuid (req: Request, res: Response): Promise<void> {
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid
    this.logger.info('[SaleController][getSaleByUuid] -> starting...')

    const sale = await this.saleAction.getSaleByUuid(uuid)

    let result
    if (sale === null) {
      result = await this.responseFormat.run(['Sale not found.'], protocol, host, path, 404)
      res.status(404)
    } else {
      result = await this.responseFormat.run([sale], protocol, host, path, 200)
      res.status(200)
    }

    this.logger.info('[SaleController][getSaleByUuid] -> end.')

    res.json(result)
  }

  public async createSale (req: Request, res: Response): Promise<void> {
    this.logger.info('[SaleController][createSale] -> starting...')

    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path

    const { ownerId, agencyId, price } = req.body

    const sale = { ownerId, agencyId, price }
    const newSale = await this.saleAction.createSale(sale)

    let result

    if (newSale === null) {
      result = null
      res
        .status(404)
        .send('Error: sale was not created, please insert valid inputs.')
    }

    result = await this.responseFormat.run(newSale, protocol, host, path, 200)

    res.json(result)
  }

  public async updateSale (req: Request, res: Response): Promise<void> {
    this.logger.info('[SaleController][updateSale] -> starting...')
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid

    const sale = { ...req.body }

    const saleUpdated = await this.saleAction.updateSale(uuid, sale)
    let result
    if (saleUpdated === null) {
      result = await this.responseFormat.run(
        ['Sale has not been updated.'],
        protocol,
        host,
        path,
        404
      )
      res.status(404)
    } else {
      result = await this.responseFormat.run(
        ['Sale has been updated successfully.'],
        protocol,
        host,
        path,
        200
      )
      res.status(200)
    }

    this.logger.info('[SaleController][update] -> end.')
    res.json(result)
  }

  public async deleteSale (req: Request, res: Response): Promise<void> {
    this.logger.info('[SaleController][deleteSale] -> starting...')

    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid

    const saleDeleted = await this.saleAction.deleteSale(uuid)

    let result
    if (saleDeleted === null) {
      result = await this.responseFormat.run(
        ['Sale has not been deleted.'],
        protocol,
        host,
        path,
        404
      )
      res.status(404)
    } else {
      result = await this.responseFormat.run(
        ['Sale has been deleted successfully.'],
        protocol,
        host,
        path,
        200
      )
      res.status(200)
    }
    this.logger.info('[SaleController][delete] -> end.')
    res.json(result)
  }
}
