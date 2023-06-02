const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    national_number: {
        type: Number,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Teacher', teacherSchema, 'Teachers')