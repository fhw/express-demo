const heWeather = require('./heWeather')
const weChat = require('./weChat')
const user = require('./user')

module.exports = function (app) {

  const baseUrl = '/api'

  app.use(`${baseUrl}/heWeather`, heWeather)
  app.use(`${baseUrl}/weChat`, weChat)
  app.use(`${baseUrl}/user`, user)

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
