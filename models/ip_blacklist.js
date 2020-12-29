'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ip_blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ip_blacklist.init(
    {
      ip: DataTypes.STRING,
      blacktime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Ip_blacklist',
    }
  )
  return Ip_blacklist
}
