const mongoose = require('mongoose')
const config = require('../config')
const logger = require('../common/logger')

const mongoClient = mongoose.connect(config.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err) {
    if (err) {
      logger.error('connect to %s error: ', config.db, err.message)
      process.exit(1)
    }
  })
logger.info('connect successFul, you are connecting %s', config.db)

exports.User = mongoose.model('t_user', require('./user').UserSchema)
