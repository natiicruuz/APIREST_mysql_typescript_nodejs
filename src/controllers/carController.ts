import { type CarActions } from 'actions/indexActions'
import { type Request, type Response } from 'express'
import { type Logger, type Exception, type Uuid } from '../utils/indexUtils'

export class CarController {
  private readonly carAction: CarActions
  private readonly logger: Logger
  private readonly exception: Exception
  private readonly uuidGenerator!: Uuid

  constructor (carAction: CarActions, logger: Logger, exception: Exception, uuidGenerator: Uuid) {
    this.carAction = carAction
    this.logger = logger
    this.exception = exception
    this.uuidGenerator = uuidGenerator


    this.getCar = this.getCar.bind(this)
    this.createCar = this.createCar.bind(this)
    this.updateCar = this.updateCar.bind(this)
  }

  async getCar (req: Request, res: Response): Promise<void> {
    const result = await this.carAction.getCar()
    res.send(200).json(result)
  }

  async createCar (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[CategoryController][createCar] -> starting...')
      const car = {
        uuid: req.body.uuid,
        name: req.body.name,
        model: req.body.model
      }
      const newCar = await this.carAction.createCar(car)
      let result

      if (newCar === null) {
        result = res.status(404).send('Error: car was not created, please insert valid inputs.')
      } else {
        result = res.status(200)
      }
      res.json(result)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }

  async updateCar (req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('[CategoryController][updateCar] -> starting...')

    // const carUpdated = await this.carAction.updateCar(uuidGenerator, car)
    } catch (error) {
      throw new Error(await this.exception.getErrorMessage(error))
    }
  }
}
