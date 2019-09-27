const userModel = require('./../models').User
const jwt = require('jsonwebtoken')
const config = require('./../config')
exports.login = function (req, res) {
  const name = req.body.userName
  const password = req.body.password

  userModel.findOne({name, password}, function (err, doc) {
    const token = jwt.sign({_id: doc._id}, config.jwt.privateKey, {expiresIn:60})
    doc.token = token
    doc.editTime = Date.now()
    doc.save()
    res.cookie('token', token)
    res.send({
      code: '200',
      msg: '请求成功',
      result: token
    })
  })
}

exports.register = function (req, res) {
  const name = req.body.userName
  const password = req.body.password

  const user = new userModel({
    name,
    password
  })

  user.save(function (err) {
    if (err) throw err
    res.json({
      code: '200',
      msg: '请求成功',
      result: {
        name,
        password
      }
    })
  })
}

exports.myInfo = function (req, res) {
  const token = req.cookies.token
  jwt.verify(token, config.jwt.privateKey, function (err, decoded) {
    console.log(err)
    if (err) {
      throw err
    }
    console.log(decoded)
  })
  userModel.findOne({token}, function (err, doc) {
    res.render('myInfo', doc)
  })
}
