const logger = require('../common/logger')
const ignore = /^\/(public|agent|favicon|stylesheets)/

module.exports = function (req, res, next) {
  // Assets do not out log.
  if (ignore.test(req.url)) {
    next()
    return
  }

  const t = new Date()
  logger.info(`[Start] ${req.method} ${req.url} ${req.ip} "${req.header('user-agent')}"`)

  res.on('finish', function () {
    const duration = ((new Date()) - t)

    logger.info(`[Complete] ${res.statusCode} ${duration}ms`)
  })

  next()
}
