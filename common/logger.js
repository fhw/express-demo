const config = require('../config')
const pathLib = require('path')

const env = process.env.NODE_ENV || 'development'

const log4js = require('log4js')
log4js.configure({
    appenders: {
        'out': {
            type: 'stdout',
            layout: {
                type: 'pattern', pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}][%p][%c] %f{2}-%l%] %m'
            }
        }
    },
    categories: {
        default: {appenders: ['out'], level: 'info', enableCallStack: true}
    }
})

const logger = log4js.getLogger()
logger.level = (config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger
