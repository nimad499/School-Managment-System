const teacherModel = require('../Model/teacher.model')
const courseModel = require('../Model/teacher.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

async function addTeacher(teacher) {
    const teacherDoc = new teacherModel(teacher)
    const validationResult = await teacherDoc.validate()
    if (validationResult)
        return validationResult

    teacher.password = await bcrypt.hash(teacher.password, 10)

    const token = jwt.sign({
        national_number: teacher.national_number,
        role: 'teacher'
    },
        config.get('TOKEN_KEY'),
        { expiresIn: '2h' }
    )
    teacher.token = token

    return teacherModel(teacher).save()
}

function removeTeacher(national_number) {
    return teacherModel.findOneAndDelete({ national_number: national_number }).then(teacher => {
        if (teacher) {
            teacher.courses.forEach(course =>
                courseModel.findByIdAndDelete(course._id).exec()
            )

            return teacher.populate({
                path: 'courses',
                populate: {
                    path: 'scores',
                    populate: {
                        path: 'student',
                    },
                },
            })
        }
    })
}

function updateTeacher(national_number, teacher) {
    return teacherModel.findOneAndUpdate({ national_number: national_number }, teacher, {
        returnOriginal: false
    }).populate({
        path: 'courses',
        populate: {
            path: 'scores',
            populate: {
                path: 'student',
            },
        },
    })
}

function getTeacher(national_number) {
    return teacherModel.findOne({ national_number: national_number }).populate({
        path: 'courses',
        populate: {
            path: 'scores',
            populate: {
                path: 'student',
            },
        },
    })
}

function getAllTeachers() {
    return teacherModel.find().populate({
        path: 'courses',
        populate: {
            path: 'scores',
            populate: {
                path: 'student',
            },
        },
    })
}

async function loginTeacher(national_number, password) {
    if (!password || !national_number)
        throw { name: 'BadRequest', message: 'The login request is missing the required username and password parameters' }

    let teacher = await teacherModel.findOne({ national_number: national_number })
    if (teacher && (await bcrypt.compare(password, teacher.password))) {
        const token = jwt.sign({
            national_number: teacher.national_number,
            role: 'teacher'
        },
            config.get('TOKEN_KEY'),
            { expiresIn: '2h' }
        )

        teacher = teacher.toJSON()
        teacher.token = token
        delete teacher.password

        return teacher
    }

    throw { name: 'Unauthorized', message: 'National Number or Password is incorrect' }
}

module.exports = { addTeacher, removeTeacher, updateTeacher, getTeacher, getAllTeachers, loginTeacher }