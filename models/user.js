const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.UserSchema = new Schema({
  name: {type: String},
  sex: {type: String},
  age: {type: Number},
  email: {type: String},
  address: {type: String},
  cellphone: {type: String},
  password: {type: String, default: '123456'},
  loginTime: {type: Date, default: Date.now()},
  editTime: {type: Date, default: Date.now()},
  createTime: {type: Date, default: Date.now()},
  token: {type: String}
})
