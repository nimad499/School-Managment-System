const studentService = require('../../Service/students.service')
const teacherService = require('../../Service/teachers.service')

// Temp
const jwt = require('jsonwebtoken')
const config = require('config')

function loginPage(req, res, next) {
    res.render('login.ejs', { message: req.session.message })
    req.session.destroy()
}

function login(req, res, next) {
    const { role, national_number, password } = req.body

    switch (role) {
        case 'student':
            studentService.loginStudent(national_number, password)
                .then(student => {
                    res.cookie('token', student.token)
                    res.redirect('/students/dashboard')
                })
                .catch(err => {
                    next(err)
                })
            break;

        case 'teacher':
            teacherService.loginTeacher(national_number, password)
                .then(teacher => {
                    res.cookie('token', teacher.token)
                    res.redirect('/teachers/dashboard')
                })
                .catch(err => {
                    next(err)
                })
            break;

        // TODO
        case 'admin':
            if (national_number == 'admin' && password == 'admin') {
                const token = jwt.sign({
                    role: 'admin'
                },
                    config.get('TOKEN_KEY'),
                    { expiresIn: '2h' }
                )
                res.cookie('token', token)
                res.redirect('/admin/dashboard')
            }
            else {
                next({ name: 'Unauthorized', message: 'National Number or Password is incorrect' })
            }
            break;
    }
}

module.exports = { loginPage, login }