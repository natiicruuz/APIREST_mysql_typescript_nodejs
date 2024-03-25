/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'
import { logger } from '../utils/indexUtils'

import { userController } from '../controllers/IndexController'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const authMiddleware = new AuthMiddleware(logger)

const router = Router()

router.get('/api/v1/users', [authMiddleware.authenticate], userController.getUser)
router.get('/api/v1/users/:uuid', [authMiddleware.authenticate], userController.getUserByUuid)
router.post('/api/v1/users', [authMiddleware.authenticate], userController.createUser)
router.put('/api/v1/users/:uuid', [authMiddleware.authenticate], userController.updateUser)
router.delete('/api/v1/users/:uuid', [authMiddleware.authenticate], userController.deleteUser)

export default router
