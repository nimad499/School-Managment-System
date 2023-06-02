const express = require('express')
const router = express.Router()
const controller = require('../../Controller/api/enroll.controller')

router.post('/:courseID', controller.enrollStudents)

module.exports = router