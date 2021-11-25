import { v4 as uuidv4 } from 'uuid';

import data from '../../data/rushing.json'

export default {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let rushingStatisticsArray = []
    data.forEach((rushingStatistic) => {
      rushingStatisticsArray.push({
        ...rushingStatistic,
        id: uuidv4(),
        Yds: typeof rushingStatistic.Yds === 'string' ? parseFloat(`${rushingStatistic.Yds}`.replace(/,/g,'')) : rushingStatistic.Yds,
        Lng: parseInt(rushingStatistic.Lng),
        TDOccured: typeof rushingStatistic.Lng === 'string' ? rushingStatistic.Lng.includes('T') ? true : false : false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })
    return queryInterface.bulkInsert('RushingStatistics', rushingStatisticsArray)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RushingStatistics', null)
    }
  }
};
