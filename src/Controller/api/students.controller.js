const service = require('../../Service/students.service')

function addStudent(req, res, next) {
    delete req.body.courses
    delete req.body.token

    service.addStudent(req.body)
        .then(student => res.status(201).json(student))
        .catch(err => {
            next(err)
        })
}

function removeStudent(req, res, next) {
    service.removeStudent(req.params.national_number)
        .then((student) => {
            if (student)
                res.status(200).send(student)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function updateStudent(req, res, next) {
    delete req.body.courses
    delete req.body.token

    service.updateStudent(req.params.national_number, req.body)
        .then((student) => {
            if (student)
                res.status(200).send(student)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function getStudent(req, res, next) {
    service.getStudent(req.params.national_number)
        .then((student) => {
            if (student)
                res.send(student)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function getAllStudents(req, res, next) {
    service.getAllStudents()
        .then((students) => {
            res.json(students)
        })
        .catch(err => {
            next(err)
        })
}

function loginStudent(req, res, next) {
    const { national_number, password } = req.body
    service.loginStudent(national_number, password)
        .then((student) => {
            res.json(student)
        })
        .catch(err => {
            next(err)
        })
}

function studentInfo(req, res, next) {
    service.getStudent(req.user.national_number)
        .then((student) => {
            if (student)
                res.send(student)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { addStudent, removeStudent, updateStudent, getStudent, getAllStudents, loginStudent, studentInfo }