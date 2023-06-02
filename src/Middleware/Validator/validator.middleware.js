const createHttpError = require('http-errors')
const Validators = require('./Validators')

module.exports = function (validator) {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function (req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if (err.isJoi) {
                req.session.message = err.message
                res.redirect(req.originalUrl)
                return
            }
            next(createHttpError(500))
        }
    }
}