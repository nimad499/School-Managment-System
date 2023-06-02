const jwt = require('jsonwebtoken')
const config = require('config')

const TOKEN_KEY = config.get('TOKEN_KEY')

const auth = (role) => {
    return (req, res, next) => {
        const token =
            req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token

        if (!token)
            return res.status(401).json({ message: 'Access denied. No token provided.' })

        try {
            const decodedToken = jwt.verify(token, TOKEN_KEY)
            req.user = decodedToken

            if (decodedToken.role !== role)
                return res.status(403).json({ message: 'Access denied. You do not have permission to access this resource.' })
        }
        catch (err) {
            return res.status(400).json({ message: 'Invalid token.' })
        }

        return next()
    }
}

module.exports = auth