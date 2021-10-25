export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RushingStatistics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      Player: {
        type: Sequelize.STRING
      },
      Team: {
        type: Sequelize.STRING
      },
      Pos: {
        type: Sequelize.STRING
      },
      Att: {
        type: Sequelize.INTEGER
      },
      "Att/G": {
        type: Sequelize.FLOAT
      },
      Yds: {
        type: Sequelize.INTEGER
      },
      Avg: {
        type: Sequelize.FLOAT
      },
      "Yds/G": {
        type: Sequelize.FLOAT
      },
      TD: {
        type: Sequelize.INTEGER
      },
      Lng: {
        type: Sequelize.INTEGER
      },
      TDOccured: {
        type: Sequelize.BOOLEAN
      },
      "1st": {
        type: Sequelize.INTEGER
      },
      "1st%": {
        type: Sequelize.FLOAT
      },
      "20+": {
        type: Sequelize.INTEGER
      },
      "40+": {
        type: Sequelize.INTEGER
      },
      FUM: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RushingStatistics');
  }
};