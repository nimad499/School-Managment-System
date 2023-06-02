const express = require('express')
const router = express.Router()
const controller = require('../../Controller/api/courses.controller')

router.get('/', controller.getAllCourses)
router.get('/:courseID', controller.getCourse)
router.post('/', controller.addCourse)
router.delete('/:courseID', controller.removeCourse)
router.put('/setScore', controller.setScore)
router.put('/:courseID', controller.updateCourse)

module.exports = router