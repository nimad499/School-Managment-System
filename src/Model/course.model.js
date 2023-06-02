const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    courseID: {
        type: Number,
        unique: true,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId, ref: 'Teacher',
        required: true
    },
    scores: [{
        student: {
            type: Schema.Types.ObjectId, ref: 'Student'
        },
        score: { type: Number }
    }]
})

module.exports = mongoose.model('Course', courseSchema, 'Courses')