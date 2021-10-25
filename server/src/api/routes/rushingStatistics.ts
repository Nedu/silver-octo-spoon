import { Router } from 'express'
import { rushingStatistics } from '../controllers'

const route = Router()

export default (app: Router) => {
  app.use('/v1', route)

  route.get('/rushingStatistics', rushingStatistics.getAllRushingStatistics)
  route.get('/download', rushingStatistics.downloadAllRushingStatistics)
}
