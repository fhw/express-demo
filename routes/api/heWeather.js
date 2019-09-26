const httpProxyMiddleware = require('http-proxy-middleware')

// 和风天气key（普通用户）
const myKey = 'd2961e751d2442d1b99134794300c28e'

const options = {
  target: 'https://free-api.heweather.net',
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
  pathRewrite: function (path, req) {
    return path.replace(/api\/heWeather\/(.*)/, '$1')
  },
  onOpen: function (err, req, res) {
    console.log('onOpen')
  },
  onClose: function (err, req, res) {
    console.log('onClose')
  },
  onError: function (err, req, res) {
    console.log('onError')
  },
  onProxyReq: function (proxyReq, req, res) {
    const params = proxyReq.path.indexOf('?') !== -1 ? `&key=${myKey}` : `?key=${myKey}`
    proxyReq.path += params
    console.log('onProxyReq')
  },
  onProxyRes: function (proxyRes, req, res) {
    console.dir(proxyRes.statusCode)
    console.log('onProxyRes')
  }
}

const proxy = httpProxyMiddleware(options)

module.exports = proxy
