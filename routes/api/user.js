const express = require('express')
const router = express.Router()
const userControllers = require('./../../controllers/user')

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.get('/login', userControllers.loginGet)

module.exports = router
