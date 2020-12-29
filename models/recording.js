'use strict'
const { Model } = require('sequelize')
const { gTypeConfig, statusConfig } = require('../config/configDefault')
module.exports = (sequelize, DataTypes) => {
  class recording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Recording, Prize } = models
      Recording.belongsTo(Prize)
    }
  }
  recording.init(
    {
      gift_id: { type: DataTypes.INTEGER, comment: '奖品id' },
      gift_name: { type: DataTypes.STRING, comment: '奖品名称' },
      gift_type: {
        type: DataTypes.INTEGER,
        get() {
          const item = this.getDataValue('gift_type')
          for (const it in gTypeConfig) {
            if (item === gTypeConfig[it]) {
              return it
            }
          }
        },
        comment: '奖品类型',
      },
      user_id: DataTypes.INTEGER,
      sys_ip: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        get() {
          const item = this.getDataValue('status')
          for (const it in statusConfig) {
            if (item === statusConfig[it]) {
              return it
            }
          }
        },
      },
    },
    {
      sequelize,
      modelName: 'Recording',
    }
  )
  return recording
}
