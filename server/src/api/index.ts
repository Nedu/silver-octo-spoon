import { Router } from 'express'
import rushingStatistics from './routes/rushingStatistics'

export default () => {
  const app = Router()
  rushingStatistics(app)
  return app
}