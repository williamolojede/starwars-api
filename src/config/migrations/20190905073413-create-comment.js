export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ipAddress: {
      type: Sequelize.INET,
      allowNull: false,
    },
    episodeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
    .catch(error => logger.error(error.stack)), 
  down: queryInterface => queryInterface.dropTable('Comments')
    .catch(error => logger.error(error.stack)), 
};
