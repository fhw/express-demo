const path = require('path')

module.exports = {
  name: 'ExpressDemo',
  debug: true,
  port: 3000,
  db: 'mongodb+srv://root:fhwfhwasdw@express-demo-hagxf.azure.mongodb.net/db_express_demo?retryWrites=true&w=majority',
  jwt: {
    privateKey: 'passKey',
    expiresIn: '3h'
  },
  log_dir: path.join(__dirname, 'logs')
}
