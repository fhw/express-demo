const config = require('../config')
const pathLib = require('path')

const env = process.env.NODE_ENV || 'development'

const log4js = require('log4js')
// log4js.configure({
//   appenders: [
//     {type: 'console'},
//     {type: 'file', filename: pathLib.join(config.log_dir, 'cheese.log')}
//   ]
// })

const logger = log4js.getLogger()
logger.level = (config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger
