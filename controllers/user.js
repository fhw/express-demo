const response = require('../common/response')
const userModel = require('./../models').User
const jwt = require('jsonwebtoken')
const config = require('./../config')
const regexp = require('./../common/regexp')
const logger = require('./../common/logger')

// 登录
exports.login = function (req, res) {
  const name = req.body.userName
  const password = req.body.password

  userModel.findOne({
    $or: [{cellphone: name}, {email: name}]
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 400,
        msg: err
      })
    }

    if (!doc) {
      res.json({
        code: 400,
        msg: '用户不存在！'
      })
    }

    if (doc.password !== password) {
      res.json({
        code: 400,
        msg: '用户密码错误！'
      })
    }

    const token = jwt.sign({_id: doc._id}, config.jwt.privateKey, {expiresIn: 60})
    doc.token = token
    doc.editTime = Date.now()
    doc.save()
    res.cookie('token', token)
    res.json({
      code: 200,
      msg: '请求成功',
      result: token
    })
  })
}

// 注册
exports.register = function (req, res) {
  const name = req.body.userName
  const password = req.body.password
  const cellphoneValid = regexp.cellphone.test(name)
  const emailValid = regexp.email.test(name)

  if (!name || name === 0) {
    res.json(response.error({msg: '账号不能为空'}))
    return false
  }

  if (!(cellphoneValid || emailValid)) {
    res.json(response.error({msg: '账号格式不正确'}))
    return false
  }

  if (!password || password === 0) {
    res.json(response.error({msg: '密码不能为空'}))
    return false
  }

  if (!regexp.password.test(password)) {
    res.json(response.error({msg: '密码格式不正确'}))
    return false
  }

  let isExist = false

  userModel.exists({
    $or: [{cellphone: name}, {email: name}]
  }, function (err, exist) {
    if (err) throw err
    isExist = exist
  })

  if (isExist) {
    res.json(response.error({msg: '该用户已注册'}))
    return false
  }

  let user = {}

  if(cellphoneValid){
    user.cellphone = name
  } else if(emailValid){
    user.email = name
  }
  user.password = password

  userModel.create(user, function (err) {
    if (err) throw err
    res.json(response.succ({msg: '注册成功！'}))
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
