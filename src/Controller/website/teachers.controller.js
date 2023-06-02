const teacherService = require('../../Service/teachers.service')

async function dashboard(req, res, next) {
    const teacher = await teacherService.getTeacher(req.user.national_number)
    res.render('teacher/teacherDashboard', { teacher })
}

async function info(req, res, next) {
    const teacher = await teacherService.getTeacher(req.user.national_number)
    res.render('teacher/teacherInfo', { teacher })
}

async function courses(req, res, next) {
    const teacher = await teacherService.getTeacher(req.user.national_number)
    res.render('teacher/teacherCourses', { teacher })
}

async function scorePage(req, res, next) {
    const teacher = await teacherService.getTeacher(req.user.national_number)
    res.render('teacher/teacherScore', { teacher: teacher, message: req.session.message, course: req.session.course })
    req.session.destroy()
}

async function getCourse(req, res, next) {
    const teacher = await teacherService.getTeacher(req.user.national_number)
    const courseID = req.body.courseID

    for (let i = 0; i < teacher.courses.length; i++) {
        if (teacher.courses[i].courseID == courseID) {
            req.session.course = teacher.courses[i]
            res.redirect(req.headers.referer)
            return
        }
    }

    next({ status: 404 })
}

module.exports = { dashboard, info, courses, scorePage, getCourse }