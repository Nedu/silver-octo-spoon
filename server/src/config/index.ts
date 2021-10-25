import dotenv from 'dotenv'
import fs from 'fs'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
}

export default {
  port: process.env.PORT || 8080,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  test: {
    sessionSecret: process.env['SESSION_SECRET'],
  },

  dev: process.env.NODE_ENV === 'dev',
  env: process.env.NODE_ENV,
}
