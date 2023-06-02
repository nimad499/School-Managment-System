const Joi = require('joi')

const loginSchema = Joi.object({
    role: Joi.string().valid('student', 'admin', 'teacher').required(),
    national_number: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = loginSchema