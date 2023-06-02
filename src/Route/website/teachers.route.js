const express = require('express')
const router = express.Router()
const controller = require('../../Controller/website/teachers.controller')
const auth = require('../../Middleware/auth.middleware.js')

router.get('/', auth('teacher'), controller.dashboard)
router.get('/info', auth('teacher'), controller.info)
router.get('/courses', auth('teacher'), controller.courses)
router.get('/score', auth('teacher'), controller.scorePage)
router.post('/getCourse', auth('teacher'), controller.getCourse)

module.exports = router