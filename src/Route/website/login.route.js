const express = require('express')
const router = express.Router()
const controller = require('../../Controller/website/login.controller')
const validator = require('../../Middleware/Validator/validator.middleware')

router.get('/', controller.loginPage)
router.post('/', validator('login'), controller.login)

module.exports = router