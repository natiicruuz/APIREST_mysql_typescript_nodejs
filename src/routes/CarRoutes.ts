/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'
import { logger } from '../utils/indexUtils'

import { carController } from '../controllers/IndexController'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const authMiddleware = new AuthMiddleware(logger)

const router = Router()

router.get('/api/v1/cars', [authMiddleware.authenticate], carController.getCar)
router.get('/api/v1/cars/:uuid', [authMiddleware.authenticate], carController.getCarByUuid)
router.post('/api/v1/cars', [authMiddleware.authenticate], carController.createCar)
router.put('/api/v1/cars/:uuid', [authMiddleware.authenticate], carController.updateCar)
router.delete('/api/v1/cars/:uuid', [authMiddleware.authenticate], carController.deleteCar)

export default router
