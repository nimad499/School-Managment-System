const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
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
    guardian_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
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

module.exports = mongoose.model('Student', studentSchema, 'Students')