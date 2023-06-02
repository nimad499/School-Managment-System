const service = require('../../Service/teachers.service')

function addTeacher(req, res, next) {
    delete req.body.courses
    delete req.body.token

    service.addTeacher(req.body)
        .then(teacher => res.status(201).json(teacher))
        .catch(err => {
            next(err)
        })
}

function removeTeacher(req, res, next) {
    service.removeTeacher(req.params.national_number)
        .then((teacher) => {
            if (teacher)
                res.status(200).send(teacher)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function updateTeacher(req, res, next) {
    delete req.body.courses
    delete req.body.token

    service.updateTeacher(req.params.national_number, req.body)
        .then((teacher) => {
            if (teacher)
                res.status(200).send(teacher)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function getTeacher(req, res, next) {
    service.getTeacher(req.params.national_number)
        .then((teacher) => {
            if (teacher)
                res.send(teacher)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function getAllTeachers(req, res, next) {
    service.getAllTeachers()
        .then((teachers) => {
            res.json(teachers)
        })
        .catch(err => {
            next(err)
        })
}

function loginTeacher(req, res, next) {
    const { national_number, password } = req.body
    service.loginTeacher(national_number, password)
        .then((teacher) => {
            res.json(teacher)
        })
        .catch(err => {
            next(err)
        })
}

function teacherInfo(req, res, next) {
    service.getTeacher(req.user.national_number)
        .then((teacher) => {
            if (teacher)
                res.send(teacher)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { addTeacher, removeTeacher, updateTeacher, getTeacher, getAllTeachers, loginTeacher, teacherInfo }