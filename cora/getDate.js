function getDate() {
  let time = new Date()
  time.setHours(0)
  time.setSeconds(0)
  time.setMinutes(0)
  return time
}

module.exports = getDate()
