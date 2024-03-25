/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type AgencyActions } from 'actions/IndexActions'
import { type Request, type Response } from 'express'
import { type Logger, type Exception, type ResponseFormat } from '../utils/indexUtils'

export class AgencyController {
  private readonly agencyAction: AgencyActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly responseFormat: ResponseFormat

  constructor (
    agencyAction: AgencyActions,
    logger: Logger,
    exception: Exception,
    responseFormat: ResponseFormat
  ) {
    this.agencyAction = agencyAction
    this.logger = logger
    this.exception = exception
    this.responseFormat = responseFormat

    this.getAgency = this.getAgency.bind(this)
    this.getAgencyByUuid = this.getAgencyByUuid.bind(this)
    this.createAgency = this.createAgency.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.deleteAgency = this.deleteAgency.bind(this)
  }

  public async getAgency (req: Request, res: Response): Promise<void> {
    const pageNumber = parseInt(req.query.page as string ?? '1', 10)
    const size = parseInt(req.query.limit as string ?? '100', 10)

    const result = await this.agencyAction.getAgency(pageNumber, size)
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path

    const response = await this.responseFormat.run(result, protocol, host, path, 200)

    res.json(response)
  }

  public async getAgencyByUuid (req: Request, res: Response): Promise<void> {
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid
    this.logger.info('[AgencyController][getAgencyByUuid] -> starting...')

    const agency = await this.agencyAction.getAgencyByUuid(uuid)

    let result
    if (agency === null) {
      result = await this.responseFormat.run(['Agency not found.'], protocol, host, path, 404)
      res.status(404)
    } else {
      result = await this.responseFormat.run([agency], protocol, host, path, 200)
      res.status(200)
    }

    this.logger.info('[AgencyController][getAgencyByUuid] -> end.')

    res.json(result)
  }

  public async createAgency (req: Request, res: Response): Promise<void> {
    this.logger.info('[AgencyController][createAgency] -> starting...')

    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path

    const { name, model, year } = req.body

    const agency = { name, model, year }
    const newAgency = await this.agencyAction.createAgency(agency)

    let result

    if (newAgency === null) {
      result = null
      res
        .status(404)
        .send('Error: agency was not created, please insert valid inputs.')
    }

    result = await this.responseFormat.run(newAgency, protocol, host, path, 200)
    this.logger.info('[AgencyController][createAgency] -> end.')

    res.json(result)
  }

  public async updateAgency (req: Request, res: Response): Promise<void> {
    this.logger.info('[AgencyController][updateAgency] -> starting...')
    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid

    const agency = { ...req.body }

    const agencyUpdated = await this.agencyAction.updateAgency(uuid, agency)
    let result
    if (agencyUpdated === null) {
      result = await this.responseFormat.run(['Agency has not been updated.'], protocol, host, path, 404)
      res.status(404)
    } else {
      result = await this.responseFormat.run(['Agency has been updated successfully.'], protocol, host, path, 200)
      res.status(200)
    }

    this.logger.info('[AgencyController][update] -> end.')
    res.json(result)
  }

  public async deleteAgency (req: Request, res: Response): Promise<void> {
    this.logger.info('[AgencyController][deleteAgency] -> starting...')

    const protocol = req.protocol
    const host = req.get('host') ?? '/'
    const path = req.path
    const uuid = req.params.uuid

    const agencyDeleted = await this.agencyAction.deleteAgency(uuid)

    let result
    if (agencyDeleted === null) {
      result = await this.responseFormat.run(
        ['Agency has not been deleted.'],
        protocol,
        host,
        path,
        404
      )
      res.status(404)
    } else {
      result = await this.responseFormat.run(['Agency has been deleted successfully.'], protocol, host, path, 200)
      res.status(200)
    }
    this.logger.info('[AgencyController][delete] -> end.')
    res.json(result)
  }
}
