import { Model, Optional } from 'sequelize';

interface IErrorDetail {
  status: number
  message: string
  name?: string
}

interface IRushingStatisticsAttributes {
  id: string;
  Player: string;
  Team: string;
  Pos: string;
  Att: number;
  ['Att/G']: number;
  Yds: number;
  Avg: number;
  ['Yds/G']: number;
  TD: number;
  Lng: string;
  TDOccured: boolean;
  ['1st']: number;
  ['1st%']: number;
  ['20+']: number;
  ['40+']: number;
  FUM: number;
};

interface RushingStatisticsCreationAttributes
  extends Optional<IRushingStatisticsAttributes, 'id'> {}

interface IRushingStatisticsInstance
  extends Model<IRushingStatisticsAttributes, RushingStatisticsCreationAttributes>,
    IRushingStatisticsAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

interface IRushingStatistics {
    rows: IRushingStatisticsInstance[];
    count: number;
}

export {
  IErrorDetail,
  IRushingStatistics,
  IRushingStatisticsAttributes,
  IRushingStatisticsInstance
}