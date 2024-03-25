/* eslint-disable @typescript-eslint/unbound-method */

import { Router } from 'express'
import { logger } from '../utils/indexUtils'

import { saleController } from '../controllers/IndexController'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const authMiddleware = new AuthMiddleware(logger)

const router = Router()

router.get('/api/v1/sales', [authMiddleware.authenticate], saleController.getSale)
router.get('/api/v1/sales/:uuid', [authMiddleware.authenticate], saleController.getSaleByUuid)
router.post('/api/v1/sales', [authMiddleware.authenticate], saleController.createSale)
router.put('/api/v1/sales/uuid', [authMiddleware.authenticate], saleController.updateSale)
router.delete('/api/v1/sales/:uuid', [authMiddleware.authenticate], saleController.deleteSale)

export default router
