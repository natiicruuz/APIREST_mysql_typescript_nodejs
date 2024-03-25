/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type AgencyRepository } from '../data/IndexData'
import { type Logger, type Exception, type Nullable, type Uuid } from '../utils/indexUtils'

export class AgencyActions {
  private readonly agencyRepository: AgencyRepository
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly uuidGenerator!: Uuid

  constructor (
    agencyRepository: AgencyRepository,
    logger: Logger,
    exception: Exception,
    uuidGenerator: Uuid
  ) {
    this.agencyRepository = agencyRepository
    this.logger = logger
    this.exception = exception
    this.uuidGenerator = uuidGenerator
  }

  async getAgency (page: number, limit: number): Promise<any> {
    this.logger.info('[AgencyAction][getAgency] -> starting...')

    const result = await this.agencyRepository.getAgency(page, limit)

    this.logger.info('[AgencyAction][getAgency] -> end.')

    return result
  }

  async getAgencyByUuid (agencyUuid: string): Promise<any> {
    this.logger.info('[AgencyAction][getAgencyByUuid] -> starting...')
    let agency
    if (agencyUuid !== undefined || agencyUuid !== null) {
      agency = await this.agencyRepository.getAgencyByUuid(agencyUuid)
    } else {
      agency = null
    }
    this.logger.info('[AgencyAction][getAgencyByUuid] -> end.')

    return agency
  }

  async createAgency (agency: any): Promise<Nullable<any>> {
    this.logger.info('[AgencyAction][create] -> starting...')
    let newAgency
    if (agency === null || agency === undefined || Object.keys(agency).length === 0) {
      newAgency = null
    } else {
      const uuidCategory = this.uuidGenerator.generate()
      agency.uuid = uuidCategory
      newAgency = await this.agencyRepository.createAgency(agency)
    }
    this.logger.info('[AgencyAction][create] -> end.')
    return newAgency
  }

  async updateAgency (uuid: string, agency: any): Promise<Nullable<any>> {
    this.logger.info('[AgencyAction][update] -> starting...')
    let agencyUpdated
    console.log(uuid)
    if (
      (uuid !== null || uuid !== undefined) &&
        (agency !== null || agency !== undefined)
    ) {
      agencyUpdated = await this.agencyRepository.updateAgency(uuid, agency)
    } else {
      agencyUpdated = null
    }
    this.logger.info('[AgencyAction][update] -> end.')
    return agencyUpdated
  }

  public async deleteAgency (uuid: string): Promise<Nullable<boolean>> {
    this.logger.info('[AgencyAction][delete] -> starting...')
    let agencyDeleted

    if (uuid === null || uuid === undefined) {
      agencyDeleted = null
    } else {
      agencyDeleted = await this.agencyRepository.deleteAgency(uuid)
    }

    this.logger.info('[AgencyAction][delete] -> end.')
    console.log('agency deleted: ', agencyDeleted)
    return agencyDeleted
  }
}
