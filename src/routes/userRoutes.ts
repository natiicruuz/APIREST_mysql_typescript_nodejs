/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'

import { userController } from '../controllers/indexController'

const router = Router()

router.get('/api/v1/user', userController.getUser)
router.post('/api/v1/user', userController.createUser)
router.put('/api/v1/:uuid/user', userController.updateUser)
router.delete('/api/v1/:uuid/user', userController.deleteUser)

export default router
