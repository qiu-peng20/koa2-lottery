const tokenKey = '123456'

const redisDefault = {
  port: 6379,
  host: '127.0.0.1',
}

const maxNum = 300

const gTypeConfig = {
  big_prize: 0,
  small_prize: 1,
  virtual_volume: 2,
  virtual_currency: 3,
}

const statusConfig = {
  normal: 0,
  void: 1,
  usered: 2,
  cheat: 3,
}

const houseData = [
  // 中奖概率分成一百份，24小时每个时间段的机会
  //100 / (3*24) = 28
  //剩下28份分给不同的时间段
  0,0,0,
  1,1,1,
  2,2,2,
  3,3,3,
  4,4,4,
  5,5,5,
  6,6,6,
  7,7,7,
  8,8,8,
  9,9,9,
  10,10,10,10,10,10,
  11,11,11,11,11,
  12,12,12,
  13,13,13,
  14,14,14,14,14,
  15,15,15,15,15,15,
  16,16,16,16,16,16,
  17,17,17,
  18,18,18,
  19,19,19,19,19,19,
  20,20,20,20,20,20,20,
  21,21,21,21,21,21,21,
  22,22,22,22,22,22,22,
  23,23,23,
]

module.exports = { statusConfig, gTypeConfig, tokenKey, redisDefault, maxNum,houseData }
