var express = require('express')
var config = require('../config')
var router = express.Router()
var jsSHA = require('jssha')
const userControllers = require('./../controllers/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: config.name})
})

router.get('/login', function (req, res, next) {
  res.render('login', {title: '登录'})
})

router.get('/register', function (req, res, next) {
  res.render('register', {title: '注册'})
})

router.get('/myInfo', userControllers.myInfo)

// 校验微信公众号服务器配置token
router.get('/validateWechatToken', function (req, res, next) {
  var token = 'fhwToken'
  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  var signature = req.query.signature,//微信加密签名
    timestamp = req.query.timestamp,//时间戳
    nonce = req.query.nonce,//随机数
    echostr = req.query.echostr//随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  var array = [token, timestamp, nonce]
  array.sort()

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  var tempStr = array.join('')
  var shaObj = new jsSHA('SHA-1', 'TEXT')
  shaObj.update(tempStr)
  var scyptoString = shaObj.getHash('HEX')

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (signature === scyptoString) {
    console.log('验证成功')
    res.send(echostr)
  } else {
    console.log('验证失败')
    res.send('验证失败')
  }
})

module.exports = router
