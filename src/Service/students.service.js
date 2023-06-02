const studentModel = require('../Model/student.model')
const courseModel = require('../Model/course.model')
const teacherModel = require('../Model/teacher.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

async function addStudent(student) {
    const studentDoc = new studentModel(student)
    const validationResult = await studentDoc.validate()
    if (validationResult)
        return validationResult

    student.password = await bcrypt.hash(student.password, 10)

    const token = jwt.sign({
        national_number: student.national_number,
        role: 'student'
    },
        config.get('TOKEN_KEY'),
        { expiresIn: '2h' }
    )
    student.token = token

    return studentModel(student).save()
}

function removeStudent(national_number) {
    return studentModel.findOneAndDelete({ national_number: national_number }).then(student => {
        if (student) {
            student.courses.forEach(course =>
                courseModel.findByIdAndUpdate(course._id, { $pull: { scores: { student: student._id } } }).exec()
            )

            return student.populate('courses', '-scores')
        }
    })
}

function updateStudent(national_number, student) {
    return studentModel.findOneAndUpdate({ national_number: national_number }, student, {
        returnOriginal: false
    }).populate('courses', '-scores')
}

async function getStudent(national_number) {
    let student = await studentModel.findOne({ national_number: national_number }).populate('courses').lean()
    delete student.password

    const studentId = student._id.toHexString()
    for (let i = 0; i < student.courses.length; i++) {
        const course = student.courses[i]

        const score = course.scores.find(score => score.student.toHexString() == studentId).score
        course.score = score

        const teacher = await teacherModel.findById(course.teacher.toHexString()).lean()
        delete teacher.courses
        delete teacher.password
        course.teacher = teacher

        delete course.scores
    }

    return student
}

async function getAllStudents() {
    let students = await studentModel.find().populate('courses').lean()

    for (let i = 0; i < students.length; i++) {
        const student = students[i]
        const studentId = student._id.toHexString()
        for (let i = 0; i < student.courses.length; i++) {
            const course = student.courses[i]

            const score = course.scores.find(score => score.student.toHexString() == studentId).score
            course.score = score

            const teacher = await teacherModel.findById(course.teacher.toHexString()).lean()
            delete teacher.courses
            delete teacher.password
            course.teacher = teacher

            delete course.scores
        }
    }

    return students
}

async function loginStudent(national_number, password) {
    if (!password || !national_number)
        throw { name: 'BadRequest', message: 'The login request is missing the required username and password parameters' }

    let student = await studentModel.findOne({ national_number: national_number })
    if (student && (await bcrypt.compare(password, student.password))) {
        const token = jwt.sign({
            national_number: student.national_number,
            role: 'student'
        },
            config.get('TOKEN_KEY'),
            { expiresIn: '2h' }
        )

        student = student.toJSON()
        student.token = token
        delete student.password

        return student
    }

    throw { name: 'Unauthorized', message: 'National Number or Password is incorrect' }
}

module.exports = { addStudent, removeStudent, updateStudent, getStudent, getAllStudents, loginStudent }