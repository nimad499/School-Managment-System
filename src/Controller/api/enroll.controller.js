const service = require('../../Service/enroll.service')

function enrollStudents(req, res, next) {
    const national_numbers = [...new Set(req.body.national_numbers)]
    service.enrollStudents(req.params.courseID, national_numbers)
        .then(() => {
            res.status(200).json({})
        }).catch((err) => {
            next(err)
        })
}

module.exports = { enrollStudents }