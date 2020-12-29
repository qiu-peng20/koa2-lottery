'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blacklist.init(
    {
      blacktime: { type: DataTypes.DATE, comment: '黑名单限制到期时间' },
      sys_ip: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Blacklist',
    }
  )
  return blacklist
}
