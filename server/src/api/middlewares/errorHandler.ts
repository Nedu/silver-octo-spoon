import { IErrorDetail } from '../../utils/interfaces'
import { Response } from 'express'

export class ErrorHandler extends Error {
  status: number
  constructor(detail: IErrorDetail) {
    super()
    this.status = detail.status
    this.message = detail.message
    this.name = detail.name || 'Server Error'
  }

  static generic(): ErrorHandler {
    const detail: IErrorDetail = {
      status: 500,
      message: 'Server Error',
      name: 'Server Error',
    }
    return new ErrorHandler(detail)
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { status, message, name } = err

  const detail: IErrorDetail = {
    status: status || 500,
    message: message || 'Something went wrong.',
    name: name || 'Unknown',
  }

  res.status(detail.status).json({
    error: detail,
  })
}
