/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'
import { logger } from '../utils/indexUtils'

import { agencyController } from '../controllers/IndexController'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const authMiddleware = new AuthMiddleware(logger)

const router = Router()

router.get('/api/v1/agencies', [authMiddleware.authenticate], agencyController.getAgency)
router.get('/api/v1/agencies/:uuid', [authMiddleware.authenticate], agencyController.getAgencyByUuid)
router.post('/api/v1/agencies', [authMiddleware.authenticate], agencyController.createAgency)
router.put('/api/v1/agencies/:uuid', [authMiddleware.authenticate], agencyController.updateAgency)
router.delete('/api/v1/agencies/:uuid', [authMiddleware.authenticate], agencyController.deleteAgency)

export default router
