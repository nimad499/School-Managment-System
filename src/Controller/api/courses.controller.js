const service = require('../../Service/courses.service')

function addCourse(req, res, next) {
    delete req.body.scores
    service.addCourse(req.body)
        .then(Course => res.status(201).json(Course))
        .catch(err => {
            next(err)
        })
}

function removeCourse(req, res, next) {
    service.removeCourse(req.params.courseID)
        .then((course) => {
            if (course)
                res.status(200).send(course)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function updateCourse(req, res, next) {
    delete req.body.scores
    service.updateCourse(req.params.courseID, req.body)
        .then((course) => {
            if (course)
                res.status(200).send(course)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function getCourse(req, res, next) {
    service.getCourse(req.params.courseID)
        .then((course) => {
            if (course)
                res.status(200).send(course)
            else
                res.status(404).json({})
        })
        .catch(err => {
            next(err)
        })
}

function getAllCourses(req, res, next) {
    service.getAllCourses()
        .then((Courses) => {
            res.json(Courses)
        })
        .catch(err => {
            next(err)
        })
}

function setScore(req, res, next) {
    service.setScore(req.body.courseID, req.body.national_number, req.body.score)
        .then(() => res.send())
        .catch(err => next(err))
}

module.exports = { addCourse, removeCourse, updateCourse, getCourse, getAllCourses, setScore }