/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type CarActions } from 'actions/indexActions'
import { type Request, type Response } from 'express'
import { type Logger, type Exception, type ResponseFormat } from '../utils/indexUtils'

export class CarController {
  private readonly carAction: CarActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly responseFormat: ResponseFormat

  constructor (carAction: CarActions, logger: Logger, exception: Exception, responseFormat: ResponseFormat) {
    this.carAction = carAction
    this.logger = logger
    this.exception = exception
    this.responseFormat = responseFormat

    this.getCar = this.getCar.bind(this)
    this.createCar = this.createCar.bind(this)
    this.updateCar = this.updateCar.bind(this)
    this.deleteCar = this.deleteCar.bind(this)
  }

  public async getCar (req: Request, res: Response): Promise<void> {
    try {
      const result = await this.carAction.getCar()
      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path

      const response = await this.responseFormat.run(result, protocol, host, path, 200)

      res.json(response)
    } catch (error) {
      console.log(error)
    }
  }

  public async createCar (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[CarController][createCar] -> starting...')

      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path

      const { name, model, year } = req.body

      const car = { name, model, year }
      const newCar = await this.carAction.createCar(car)

      let result

      if (newCar === null) {
        result = null
        res.status(404).send('Error: car was not created, please insert valid inputs.')
      }

      result = await this.responseFormat.run(newCar, protocol, host, path, 200)

      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async updateCar (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[CarController][updateCar] -> starting...')
      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path
      const uuid = req.params.uuid

      const car = { ...req.body }

      const carUpdated = await this.carAction.updateCar(uuid, car)
      let result
      if (carUpdated === null) {
        result = await this.responseFormat.run(['Car has not been updated.'], protocol, host, path, 404)
        res.status(404)
      } else {
        result = await this.responseFormat.run(['Car has been updated successfully.'], protocol, host, path, 200)
        res.status(200)
      }

      this.logger.info('[CarController][update] -> end.')
      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  public async deleteCar (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[CarController][deleteCar] -> starting...')

      const protocol = req.protocol
      const host = req.get('host') ?? '/'
      const path = req.path
      const uuid = req.params.uuid

      const carDeleted = await this.carAction.deleteCar(uuid)

      let result
      if (carDeleted === null) {
        result = await this.responseFormat.run(['Car has not been deleted.'], protocol, host, path, 404)
        res.status(404)
      } else {
        result = await this.responseFormat.run(['Car has been deleted successfully.'], protocol, host, path, 200)
        res.status(200)
      }
      this.logger.info('[CarController][delete] -> end.')
      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
