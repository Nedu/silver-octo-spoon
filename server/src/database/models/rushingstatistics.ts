import { DataTypes, Sequelize } from 'sequelize';
import { IRushingStatisticsInstance } from 'src/utils/interfaces';

const RushingStatisticsFactory = (sequelize: Sequelize) => sequelize.define<IRushingStatisticsInstance>(
  'RushingStatistics',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    Player: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Team: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Pos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Att: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    "Att/G": { 
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Yds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Avg: { 
      type: DataTypes.FLOAT,
      allowNull: false
    },
    "Yds/G": { 
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TD: {
      type: DataTypes.INTEGER,      
      allowNull: false
    },
    Lng: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TDOccured: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    "1st": {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    "1st%" : { 
      type: DataTypes.FLOAT,
      allowNull: false
    },
    "20+" : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    "40+": {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FUM: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
);

export default RushingStatisticsFactory;
