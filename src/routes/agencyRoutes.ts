/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'

import { agencyController } from '../controllers/indexController'

const router = Router()

router.get('/api/v1/agency', agencyController.getAgency)
router.post('/api/v1/agency', agencyController.createAgency)
router.put('/api/v1/:uuid/agency', agencyController.updateAgency)
router.delete('/api/v1/:uuid/agency', agencyController.deleteAgency)

export default router
