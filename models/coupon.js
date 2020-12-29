'use strict'
const { Model } = require('sequelize')
const { statusConfig } = require('../config/configDefault')
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coupon.init(
    {
      gift_id: { type: DataTypes.INTEGER, comment: '奖品id' },
      code: { type: DataTypes.STRING, comment: '虚拟卷编码' },
      status: {
        type: DataTypes.INTEGER,
        get() {
          const item = this.getDataValue('status')
          for (const it in statusConfig) {
            if (item === statusConfig[it]) {
              return it
            }
          }
        }, // 正常 作废 已发放
      },
    },
    {
      sequelize,
      modelName: 'Coupon',
    }
  )
  return coupon
}
