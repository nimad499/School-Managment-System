const express = require('express')
const router = express.Router()
const controller = require('../../Controller/api/students.controller')
const auth = require('../../Middleware/auth.middleware.js')

router.get('/info', auth('student'), controller.studentInfo)
router.get('/', controller.getAllStudents)
router.get('/s/:national_number', controller.getStudent)
router.post('/', controller.addStudent)
router.delete('/:national_number', controller.removeStudent)
router.put('/:national_number', controller.updateStudent)
router.post('/login', controller.loginStudent)

module.exports = router