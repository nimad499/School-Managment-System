module.exports = (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
}