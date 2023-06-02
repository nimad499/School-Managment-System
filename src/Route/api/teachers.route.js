const express = require('express')
const router = express.Router()
const controller = require('../../Controller/api/teachers.controller.js')
const auth = require('../../Middleware/auth.middleware.js')

router.get('/info', auth('teacher'), controller.teacherInfo)
router.get('/', controller.getAllTeachers)
router.get('/t/:national_number', controller.getTeacher)
router.post('/', controller.addTeacher)
router.delete('/:national_number', controller.removeTeacher)
router.put('/:national_number', controller.updateTeacher)
router.post('/login', controller.loginTeacher)

module.exports = router