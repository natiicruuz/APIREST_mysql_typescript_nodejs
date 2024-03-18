import { type Request, type Response, Router, type NextFunction } from 'express'

import { logger, Exception } from '../utils/indexUtils'
import carRoutes from './carRoutes'
import agencyRoutes from './agencyRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('', carRoutes)
router.use('', agencyRoutes)
router.use('', userRoutes)

/*
router.use('' /* ruta sale ) */

router.use('/', (req: Request, res: Response) => {
  res.json({
    api: 'car-agency'
  })
})

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    res.status(400).json({
      message: err.message
    })
  } else {
    next(err)
  }
})

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  res.status(500)
  res.json({
    error: err
  })
})

export default router
