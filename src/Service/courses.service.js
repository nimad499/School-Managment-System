const courseModel = require('../Model/course.model')
const studentModel = require('../Model/student.model')
const teacherModel = require('../Model/teacher.model')

async function addCourse(course) {
    const teacher_national_number = course.teacher
    const teacher = await teacherModel.findOne({ national_number: teacher_national_number })
    course.teacher = teacher
    if (course.teacher == null)
        throw { name: 'NotFoundError', message: `Teacher with National Number ${teacher_national_number} not found.` }

    course = await courseModel(course).save()

    teacher.courses.push(course._id)
    teacher.save()

    return course
}

function removeCourse(courseID) {
    return courseModel.findOneAndDelete({ courseID: courseID }).then(course => {
        if (course) {
            course.scores.forEach(score => {
                studentModel.findByIdAndUpdate(score.student, { $pull: { courses: course._id.toHexString() } }).exec()
            }
            )

            teacherModel.findByIdAndUpdate(course.teacher, { $pull: { courses: course._id.toHexString() } })

            return course.populate('scores.student teacher', '-courses')
        }
    })
}

async function updateCourse(courseID, course) {
    if (course.teacher != null) {
        const teacher_national_number = course.teacher
        course.teacher = await teacherModel.findOne({ national_number: teacher_national_number })
        if (course.teacher == null)
            throw { name: 'NotFoundError', message: `Teacher with National Number ${teacher_national_number} not found.` }
    }

    return courseModel.findOneAndUpdate({ courseID: courseID }, course, {
        returnOriginal: false
    })
        .populate('scores.student teacher', '-courses')
}

function getCourse(courseID) {
    return courseModel.findOne({ courseID: courseID }).populate('scores.student teacher', '-courses')
}

function getAllCourses() {
    return courseModel.find().populate('scores.student teacher', '-courses')
}

async function setScore(courseID, national_number, score) {
    const course = await courseModel.findOne({ courseID: courseID }).populate('scores.student', '-courses')

    if (course == null)
        throw { name: 'NotFoundError', message: `Course with Course ID ${courseID} not found.` }


    for (let i = 0; i < course.scores.length; i++) {
        if (course.scores[i].student.national_number == national_number) {
            course.scores[i].score = score
            course.save()
            return
        }
    }

    throw { name: 'NotFoundError', message: `Student with National Number ${national_number} not found.` }
}

module.exports = { addCourse, removeCourse, updateCourse, getCourse, getAllCourses, setScore }