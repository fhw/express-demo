const mongoose = require('mongoose')
const config = require('../config')

const mongoClient = mongoose.connect(config.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err) {
    if (err) {
      console.log('connect to %s error: ', config.db, err.message)
      process.exit(1)
    }
  })

exports.User = mongoose.model('t_user', require('./user').UserSchema)
