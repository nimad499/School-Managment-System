const studentService = require('../../Service/students.service')
const teacherService = require('../../Service/teachers.service')
const courseService = require('../../Service/courses.service')
const enrollService = require('../../Service/enroll.service')

function dashboard(req, res, next) {
    res.render('admin/adminDashboard')
    req.session.destroy()
}

function addStudentPage(req, res, next) {
    res.render('admin/adminAddStudent', { message: req.session.message, student: req.session.student })
    req.session.destroy()
}

function addStudent(req, res, next) {
    delete req.body.courses
    delete req.body.token

    studentService.addStudent(req.body)
        .then(student => {
            req.session.student = student
            res.redirect(req.originalUrl)
        })
        .catch(err => {
            next(err)
        })
}

function getStudentPage(req, res, next) {
    res.render('admin/adminGetStudent', { message: req.session.message, student: req.session.student })
    req.session.destroy()
}

function getStudent(req, res, next) {
    studentService.getStudent(req.body.national_number)
        .then((student) => {
            if (student) {
                req.session.student = student
                res.redirect(req.originalUrl)
            }
            else
                next({ status: 404 })
        })
        .catch(err => {
            next(err)
        })
}

function removeStudentPage(req, res, next) {
    res.render('admin/adminRemoveStudent', { message: req.session.message, student: req.session.student })
    req.session.destroy()
}

function removeStudent(req, res, next) {
    studentService.removeStudent(req.body.national_number)
        .then((student) => {
            if (student) {
                req.session.student = student
                res.redirect(req.originalUrl)
            }
            else
                next({ status: 404 })
        })
        .catch(err => {
            next(err)
        })
}

function addTeacherPage(req, res, next) {
    res.render('admin/adminAddTeacher', { message: req.session.message, teacher: req.session.teacher })
    req.session.destroy()
}

function addTeacher(req, res, next) {
    delete req.body.courses
    delete req.body.token

    teacherService.addTeacher(req.body)
        .then(teacher => {
            req.session.teacher = teacher
            res.redirect(req.originalUrl)
        })
        .catch(err => {
            next(err)
        })
}

function getTeacherPage(req, res, next) {
    res.render('admin/adminGetTeacher', { message: req.session.message, teacher: req.session.teacher })
    req.session.destroy()
}

function getTeacher(req, res, next) {
    teacherService.getTeacher(req.body.national_number)
        .then((teacher) => {
            if (teacher) {
                req.session.teacher = teacher
                res.redirect(req.originalUrl)
            }
            else
                next({ status: 404 })
        })
        .catch(err => {
            next(err)
        })
}

function removeTeacherPage(req, res, next) {
    res.render('admin/adminRemoveTeacher', { message: req.session.message, teacher: req.session.teacher })
    req.session.destroy()
}

function removeTeacher(req, res, next) {
    teacherService.removeTeacher(req.body.courseID)
        .then((teacher) => {
            if (teacher) {
                req.session.teacher = teacher
                res.redirect(req.originalUrl)
            }
            else
                next({ status: 404 })
        })
        .catch(err => {
            next(err)
        })
}

function addCoursePage(req, res, next) {
    res.render('admin/adminAddCourse', { message: req.session.message, course: req.session.course })
    req.session.destroy()
}

function addCourse(req, res, next) {
    delete req.body.courses
    delete req.body.token

    courseService.addCourse(req.body)
        .then(course => {
            req.session.course = course
            res.redirect(req.originalUrl)
        })
        .catch(err => {
            next(err)
        })
}

function getCoursePage(req, res, next) {
    res.render('admin/adminGetCourse', { message: req.session.message, course: req.session.course })
    req.session.destroy()
}

function getCourse(req, res, next) {
    courseService.getCourse(req.body.courseID)
        .then((course) => {
            if (course) {
                req.session.course = course
                res.redirect(req.originalUrl)
            }
            else
                next({ status: 404 })
        })
        .catch(err => {
            next(err)
        })
}

function removeCoursePage(req, res, next) {
    res.render('admin/adminRemoveCourse', { message: req.session.message, course: req.session.course })
    req.session.destroy()
}

function removeCourse(req, res, next) {
    courseService.removeCourse(req.body.courseID)
        .then((course) => {
            if (course) {
                req.session.course = course
                res.redirect(req.originalUrl)
            }
            else
                next({ status: 404 })
        })
        .catch(err => {
            next(err)
        })
}

function enrollStudentPage(req, res, next) {
    res.render('admin/adminEnrollStudent',
        {
            message: req.session.message,
            student: req.session.student,
            course: req.session.course
        })
    req.session.destroy()
}

function enrollStudent(req, res, next) {
    req.body.national_numbers = [req.body.national_number]
    enrollService.enrollStudents(req.body.courseID, req.body.national_numbers)
        .then(async () => {
            req.session.student = await studentService.getStudent(req.body.national_number).then(student => student)
            req.session.course = await courseService.getCourse(req.body.courseID).then(course => course)

            res.redirect(req.originalUrl)
        }).catch((err) => {
            next(err)
        })
}

module.exports = {
    dashboard,
    addStudent, addStudentPage, getStudentPage, getStudent, removeStudentPage, removeStudent,
    addTeacher, addTeacherPage, getTeacherPage, getTeacher, removeTeacherPage, removeTeacher,
    addCourse, addCoursePage, getCoursePage, getCourse, removeCoursePage, removeCourse,
    enrollStudent, enrollStudentPage
}