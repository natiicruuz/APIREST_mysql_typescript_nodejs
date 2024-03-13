/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'

import { carController } from '../controllers/indexController'

const router = Router()

router.get('/api/v1/car', carController.getCar)
router.post('/api/v1/car', carController.createCar)

export default router
