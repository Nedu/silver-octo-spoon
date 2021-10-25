import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { sequelize } from './database/models';
import Logger from './loaders/logger'
import config from './config'
import routes from './api'
import { IErrorDetail } from './utils/interfaces'
import { ErrorHandler, handleError } from './api/middlewares/errorHandler'

const app: Application = express();

// Database setup
sequelize.authenticate()
  .then(() => {
    Logger.info(
      `Successfully connected to database in ${config.env} environment`
    )
  })
  .catch((err: any) => {
    Logger.error(`Error connecting to database: ${err}`)
  })

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load all API routes
Logger.info(routes())
app.use(config.api.prefix, routes())

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const detail: IErrorDetail = {
    message: `${req.originalUrl} does not exist on the server`,
    name: 'RouteValidation',
    status: 404,
  }
  next(new ErrorHandler(detail))
})

// error handlers
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res)
    return next(err)
  }
)

const port = 5000;

app.listen(port, () => {
  console.log('App is now running at port ', port)
})
