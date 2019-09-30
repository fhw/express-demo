// const config = require('../config')
// const pathLib = require('path')
//
// const env = process.env.NODE_ENV || 'dev'
//
// const log4js = require('log4js')
// log4js.configure({
//     appenders: {
//         'out': {
//             type: 'stdout',
//             layout: {
//                 type: 'pattern', pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}][%p][%c] %f{2}-%l%] %m'
//             }
//         }
//     },
//     categories: {
//         default: {appenders: ['out'], level: 'info', enableCallStack: true}
//     }
// })
//
// const logger = log4js.getLogger()
// logger.level = env !== 'test' ? 'DEBUG' : 'ERROR'
//
// module.exports = logger

const winston = require('winston')

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize({all: true}),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
    winston.format.splat(),
    winston.format.prettyPrint(),
    winston.format.printf(info => `[${info.level}][${info.timestamp}]-${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'log/process.log',
      format: winston.format.combine(
        winston.format.uncolorize()
      )
    })
  ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple()
//     }));
// }

module.exports = logger
