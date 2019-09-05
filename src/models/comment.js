import { Sequelize, Model } from 'sequelize';

export default class Comment extends Model {
  static init(sequelize) {
    return super.init(Comment.modelFields, { sequelize });
  }

  static modelFields = {
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
    }
  }
}
