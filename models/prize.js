'use strict'
const { Model } = require('sequelize')

const { gTypeConfig, statusConfig } = require('../config/configDefault')
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Recording, Prize } = models
      Prize.hasOne(Recording, {
        foreignKey: 'gift_id',
      })
    }
  }
  Prize.init(
    {
      title: { type: DataTypes.STRING, comment: '奖品名称' },
      prize_num: { type: DataTypes.INTEGER, comment: '奖品数量' }, //0 无奖品，>0限量，<0无限量
      left_num: { type: DataTypes.INTEGER, comment: '剩余奖品数量' },
      prize_code: { type: DataTypes.STRING, comment: '中奖的概率' }, //0~9999
      prize_time: { type: DataTypes.INTEGER, comment: '发奖周期' }, //抽奖活动持续多少天
      img: { type: DataTypes.STRING, comment: '奖品图片' },
      displayOrder: { type: DataTypes.INTEGER, comment: '位置序号' }, //小的排在前面
      gType: {
        type: DataTypes.INTEGER,
        set(val) {
          this.setDataValue('gType', gTypeConfig[val])
        },
        get() {
          const item = this.getDataValue('gType')
          for (const it in gTypeConfig) {
            if (item === gTypeConfig[it]) {
              return it
            }
          }
        },
        comment: '奖品类型',
      }, //3 虚拟币，2 虚拟卷，1 实物 小，0 实物 大
      prize_data: { type: DataTypes.TEXT, comment: '发奖计划' }, // {[时间1， 数量1]}
      prize_begin: { type: DataTypes.DATE, comment: '发奖周期开始时间' },
      prize_end: { type: DataTypes.DATE, comment: '发奖周期结束时间' },
      sys_status: {
        type: DataTypes.INTEGER,
        set(val) {
          this.setDataValue('sys_status', statusConfig[val])
        },
        get() {
          const item = this.getDataValue('sys_status')
          for (const it in statusConfig) {
            if (item === statusConfig[it]) {
              return it
            }
          }
        },
        comment: '状态',
      }, // 0 正常 1 删除
      time_begin: { type: DataTypes.DATE, comment: '开始时间' },
      time_end: { type: DataTypes.DATE, comment: '结束时间' },
      sys_ip: { type: DataTypes.INTEGER, comment: '操作人ip' },
    },
    {
      sequelize,
      modelName: 'Prize',
    }
  )
  return Prize
}
