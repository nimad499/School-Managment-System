const errorHandlers = {
    MongoServerError: (res, error) => {
        if (error.code == 11000)
            error.status = 409
        else {
            error.status = 500
            error.message = 'Internal server error'
        }
    },

    ValidationError: (res, error) => {
        error.status = 422
    },

    CastError: (res, error) => {
        error.status = 400
    },

    SyntaxError: (res, error) => {
        error.status = 400
    },

    BadRequest: (res, error) => {
        error.status = 400
    },

    NotFoundError: (res, error) => {
        error.status = 404
    },

    Unauthorized: (res, error) => {
        error.status = 401
    },

    DefaultError: (res, error) => {
        error.status = 500
        error.message = 'Internal server error'
    },
}

module.exports = function (type) {
    if (type == 'website')
        return (error, req, res, next) => {
            const errorType = error.name || 'DefaultError'

            if (errorHandlers.hasOwnProperty(errorType))
                errorHandlers[errorType](res, error)

            // console.log(error)
            req.session.message = error.message
            // res.redirect(req.originalUrl)
            res.redirect(req.headers.referer)
        }

    else if (type == 'api')
        return (error, req, res, next) => {
            const errorType = error.name || 'DefaultError'

            if (errorHandlers.hasOwnProperty(errorType))
                errorHandlers[errorType](res, error)

            res.status(error.status || 500).json({
                error: {
                    message: error.message
                }
            })
        }

    return () => { }
}

// module.exports = (error, req, res, next) => {
//     if (error.code == 11000)
//         error.status = 409
//     else if (error.name == 'ValidationError')
//         error.status = 422
//     else if (error.name == 'CastError')
//         error.status = 400
//
//     res.status(error.status || 500)
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// }