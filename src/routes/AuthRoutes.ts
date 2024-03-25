/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'

import { authController } from '../controllers/IndexController'

const router = Router()

router.post('/api/v1/login', authController.login)

export default router
