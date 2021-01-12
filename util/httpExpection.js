class httpExpection extends Error {
  constructor(msg = '服务器异常', errorCode = 9999, status = 500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = status
  }
}

class createExpection extends httpExpection {
  constructor(msg='该用户已经被注册了', errorCode = 10002, status = 400) {
    super(msg, errorCode, status)
  }
}

class loginExpection extends httpExpection {
  constructor(msg = '找不到该用户', errorCode = 10001, status = 404) {
    super(msg, errorCode, status)
  }
}

class tokenExpection extends httpExpection {
  constructor(msg = 'token已经过期', errorCode = 10010, status = 401) {
    super(msg, errorCode, status)
  }
}

class sessionExpection extends httpExpection {
  constructor() {
    super('尚未登陆,请先登录', 10012, 401)
  }
}

class ipExpection extends httpExpection {
  constructor(msg = '该用户ip已经被拉黑', errorCode = 10020) {
    super(msg, errorCode, 416)
  }
}

class userExpection extends httpExpection {
  constructor(msg = '该用户的抽奖次数已经用完', errorCode = 10030) {
    super(msg, errorCode, 406)
  }
}

class prizeExpection extends httpExpection {
  constructor(msg = 'hahaah', errorCode = 10040) {
    super(msg, errorCode, 406)
  }
}

class successExpection extends httpExpection {
  constructor(msg = '请求成功') {
    super(msg, 66666, 200)
    this.index = 0
  }
}

class idExpection extends httpExpection {
  constructor() {
    super('找不到该数据源', 10050, 400)
  }
}

module.exports = {
  httpExpection,
  loginExpection,
  tokenExpection,
  sessionExpection,
  ipExpection,
  userExpection,
  prizeExpection,
  successExpection,
  idExpection,
  createExpection 
}
