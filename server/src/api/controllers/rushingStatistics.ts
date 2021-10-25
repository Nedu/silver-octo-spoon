import { NextFunction, Request, Response } from 'express'
import { Op } from 'sequelize'
import { Parser } from 'json2csv';

import { ErrorHandler } from '../middlewares/errorHandler'
import { IErrorDetail } from '../../utils/interfaces'
import { RushingStatistics } from '../../database/models'
import { getPagination, getPagingData } from '../../utils/pagination'

interface IOptions {
    [key: string]: {}
    where: {
        Player?: Record<string, unknown>
    }
}

// /rushingStatistics?player=Joe&sort=Yds:asc,TD:desc
/* Get all rushing statistics with optional filter parameters*/
const getAllRushingStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { player } = req.query;
    const sort = req.query.sort as string
    const page = req.query.page as string
    const size = req.query.size as string
    
    //page number validation
    if (parseInt(page) < 1) {
        const detail: IErrorDetail = {
            status: 400,
            message: 'Page number must be greater than 0',
            name: 'InvalidInput',
        }
      return next(new ErrorHandler(detail))
    }


    const { limit, offset } = getPagination(page, size);
    let options: IOptions = { 
        where: {}, 
        limit,
        offset,
        order: [],
    };
    if (player) {
        options.where.Player =  {
            [Op.substring]: player
        }
    }
    if (sort) {
        options.order = sort.split(",").map(el => el.split(':'))
    }
    const rushingStatistics = await RushingStatistics.findAndCountAll(options)
    
    if (!rushingStatistics) {
      const detail: IErrorDetail = {
        status: 400,
        message:
          'Something went wrong. Rushing Statistics could not be retrieved at this time.',
        name: 'DBError',
      }
      return next(new ErrorHandler(detail))
    }
    const response = getPagingData(rushingStatistics, page, limit)

    return res.status(200).json({ data: response })
  } catch (err) {
    return next(ErrorHandler.generic())
  }
}

const downloadResource = (res: Response<any, Record<string, any>>, fileName: string, fields: { label: string; value: string; }[], data: Readonly<unknown>) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
}

/* Download all rushing statistics with optional filter parameters*/
const downloadAllRushingStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fields = [
    {
      label: 'Player',
      value: 'Player'
    },
    {
      label: 'Team',
      value: 'Team'
    },
    {
     label: 'Position',
      value: 'Pos'
    },
    {
     label: 'Rushing Attempts',
      value: 'Att'
    },
    {
     label: 'Rushing Attempts Per Game Average',
      value: 'Att/G'
    },
    {
     label: 'Total Rushing Yards',
      value: 'Yds'
    },
    {
     label: 'Rushing Average Yards Per Attempt',
      value: 'Avg'
    },
    {
     label: 'Rushing Yards Per Game',
      value: 'Yds/G'
    },
    {
     label: 'Total Rushing Touchdowns',
      value: 'TD'
    },
    {
     label: 'Longest Rush',
      value: 'Lng'
    },
    {
     label: 'Touchdown',
      value: 'TDOccured'
    },
    {
     label: 'Rushing First Downs',
      value: '1st'
    },
    {
     label: 'Rushing First Down Percentage',
      value: '1st%'
    },
    {
     label: 'Rushing 20+ Yards Each',
      value: '20+'
    },
    {
     label: 'Rushing 40+ Yards Each',
      value: '40+'
    },
    {
     label: 'Rushing Fumbles',
      value: 'FUM'
    },
  ];
  const { player } = req.query;
  const sort = req.query.sort as string
  
    let options: IOptions = { 
        where: {},
        order: [],
    };
    if (player) {
        options.where.Player =  {
            [Op.substring]: player
        }
    }
    if (sort) {
        options.order = sort.split(",").map(el => el.split(':'))
    }
    
    const data = await RushingStatistics.findAll(options);

    return downloadResource(res, 'rushingStatistics.csv', fields, data);
  } catch (err) {
    return next(ErrorHandler.generic())
  }
}


export { getAllRushingStatistics, downloadAllRushingStatistics }
