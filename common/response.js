const _ = require('lodash')

let success = {
  code: 200,
  msg: '请求成功！'
}

let error = {
  code: 500,
  msg: '请求失败！'
}

let errorAuth = {
  code: 401,
  msg: '认证失败！'
}

let response = {
  code: success.code,
  msg: success.msg,
  result: null
}

function setResult (result) {
  if (result === '' || typeof result === 'undefined') {
    return null
  } else {
    return result
  }
}

function setResponse (type, params) {
  response.code = _.has(params, 'code') ? params.code : type.code
  response.msg = _.has(params, 'msg') ? params.msg : type.msg
  response.result = setResult(_.has(params, 'result') ? params.result : null)
  return response
}

exports.failAuth = function (params) {
  return setResponse(errorAuth, params)
}

exports.error = function (params) {
  return setResponse(error, params)
}

exports.succ = function (params) {
  return setResponse(success, params)
}
