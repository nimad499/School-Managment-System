const studentService = require('../../Service/students.service')

async function dashboard(req, res, next) {
    const student = await studentService.getStudent(req.user.national_number)
    res.render('student/studentDashboard', { student })
}

async function info(req, res, next) {
    const student = await studentService.getStudent(req.user.national_number)
    res.render('student/studentInfo', { student })
}

async function courses(req, res, next) {
    const student = await studentService.getStudent(req.user.national_number)
    res.render('student/studentCourses', { student })
}

module.exports = { dashboard, info, courses }