'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class usersign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usersign.init(
    {
      user_id: DataTypes.STRING,
      day: DataTypes.DATE,
      num: {
        type: DataTypes.INTEGER,
        comment: '用户每日次数',
      },
    },
    {
      sequelize,
      modelName: 'Usersign',
    }
  )
  return usersign
}
