const userModel = require('./../models').User
exports.login = function (req, res) {
  res.json({
    code: '200',
    msg: '请求成功',
    result: {
      userName: req.body.userName,
      password: req.body.password
    }
  })
}
exports.loginGet = function (req, res) {
  userModel.findOne({name: '张三'}).select().exec(function (err, data) {
    console.log('%s %s %s %s', data.name, data.sex, data.age, data.address)
    res.send(data)
  })
  // res.json({
  //   code: '200',
  //   msg: '请求成功',
  //   result: {
  //     userName: req.body.userName,
  //     password: req.body.password
  //   }
  // })
}

exports.register = function (req, res) {
  res.json({
    code: '200',
    msg: '请求成功',
    result: {
      userName: req.body.userName,
      password: req.body.password
    }
  })
}
