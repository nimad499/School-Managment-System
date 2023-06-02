const courseModel = require('../Model/course.model')
const studentModel = require('../Model/student.model')

async function enrollStudents(courseID, national_numbers) {
    const course = await courseModel.findOne({ courseID: courseID })

    if (!course)
        throw { name: 'NotFoundError', message: `Course with ID ${courseID} not found.` }

    const students = await studentModel.find({ national_number: { $in: national_numbers } })

    if (students.length !== national_numbers.length) {
        const foundNationalNumbers = students.map(student => student.national_number)
        const missingNationalNumbers = national_numbers.filter(national_number => !foundNationalNumbers.includes(national_number))
        throw { name: 'NotFoundError', message: `Students with national numbers ${missingNationalNumbers.join(', ')} not found.` }
    }

    courseID = course._id
    students.forEach(student => {
        if (student.courses.indexOf(courseID) == -1) {
            course.scores.push({ student: student._id })

            student.courses.push(courseID)
            student.save()
        }
    })

    await course.save()

    return { course: course, students: students }
}

module.exports = { enrollStudents }