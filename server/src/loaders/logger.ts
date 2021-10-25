import winston from 'winston'

import config from '../config'

const transports = []
if (process.env.NODE_ENV !== 'dev') {
  transports.push(new winston.transports.Console())
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    }),
  )
}

const LoggerInstance = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    })
  ),
  level: config.logs.level,
  levels: winston.config.npm.levels,
  transports,
})

export default LoggerInstance
