const express = require('express')
const router = express.Router()
const controller = require('../../Controller/website/students.controller')
const auth = require('../../Middleware/auth.middleware.js')

router.get('/', auth('student'), controller.dashboard)
router.get('/info', auth('student'), controller.info)
router.get('/courses', auth('student'), controller.courses)

module.exports = router