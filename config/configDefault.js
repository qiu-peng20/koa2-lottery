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

module.exports = { statusConfig, gTypeConfig, tokenKey, redisDefault, maxNum }
