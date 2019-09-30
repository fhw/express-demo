if (process.env.NODE_env === 'dev') {
  module.exports = require('./dev')
} else {
  module.exports = require('./prod')
}
