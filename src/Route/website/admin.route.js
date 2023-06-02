const express = require('express')
const router = express.Router()
const controller = require('../../Controller/website/admin.controller')
const auth = require('../../Middleware/auth.middleware.js')

router.get('/', auth('admin'), controller.dashboard)

router.get('/addStudent', auth('admin'), controller.addStudentPage)
router.post('/addStudent', auth('admin'), controller.addStudent)
router.get('/getStudent', auth('admin'), controller.getStudentPage)
router.post('/getStudent', auth('admin'), controller.getStudent)
router.get('/removeStudent', auth('admin'), controller.removeStudentPage)
router.post('/removeStudent', auth('admin'), controller.removeStudent)

router.get('/addTeacher', auth('admin'), controller.addTeacherPage)
router.post('/addTeacher', auth('admin'), controller.addTeacher)
router.get('/getTeacher', auth('admin'), controller.getTeacherPage)
router.post('/getTeacher', auth('admin'), controller.getTeacher)
router.get('/removeTeacher', auth('admin'), controller.removeTeacherPage)
router.post('/removeTeacher', auth('admin'), controller.removeTeacher)

router.get('/addCourse', auth('admin'), controller.addCoursePage)
router.post('/addCourse', auth('admin'), controller.addCourse)
router.get('/getCourse', auth('admin'), controller.getCoursePage)
router.post('/getCourse', auth('admin'), controller.getCourse)
router.get('/removeCourse', auth('admin'), controller.removeCoursePage)
router.post('/removeCourse', auth('admin'), controller.removeCourse)

router.get('/enrollStudent', auth('admin'), controller.enrollStudentPage);
router.post('/enrollStudent', auth('admin'), controller.enrollStudent);

module.exports = router