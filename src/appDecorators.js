const config = require("config")

class App {
    constructor(app) {
        this.express = app.express
        this.expressApp = app.expressApp
        this.Database = app.Database

        this.start()
    }

    start() { }
}

class InitApp {
    constructor() {
        this.express = require('express')
        this.expressApp = this.express()
        this.Database = require('./Config/database')

        this.start()
    }

    start() {
        this.Database.connect()
        process.on('SIGINT', () => {
            this.Database.disconnect()
                .then(() => process.exit())
                .catch(() => { })
        })
    }
}

class RequestLogger extends App {
    start() {
        const morgan = require('morgan')
        this.expressApp.use(morgan('dev'))
    }
}

class RequestParser extends App {
    start() {
        const bodyParser = require('body-parser')
        this.expressApp.use(bodyParser.urlencoded({ extended: false }))
        this.expressApp.use(bodyParser.json())

        const cookieParser = require('cookie-parser')
        this.expressApp.use(cookieParser())
    }
}

class CORSHandler extends App {
    start() {
        const cors = require('./Middleware/cors.middleware')
        this.expressApp.use(cors)
    }
}

class Routes extends App {
    start() {
        const studentsRoute = require('./Route/api/students.route')
        this.expressApp.use('/students', studentsRoute)
        const coursesRoute = require('./Route/api/courses.route')
        this.expressApp.use('/courses', coursesRoute)
        const enrollRoute = require('./Route/api/enroll.route')
        this.expressApp.use('/enroll', enrollRoute)
        const teachersRoute = require('./Route/api/teachers.route')
        this.expressApp.use('/teachers', teachersRoute)
    }
}

class ErrorHandlers extends App {
    constructor(app, type) {
        super(app)
        this.type = type

        this.start()
    }

    start() {
        const invalidPathHandler = require('./Middleware/ErrorHandler/invalidPathHandler.middleware')
        this.expressApp.use(invalidPathHandler)
        const errorResponder = require('./Middleware/ErrorHandler/errorResponder.middleware')
        this.expressApp.use(errorResponder(this.type))
    }
}

class DeleteDBOnExit extends App {
    start() {
        process.prependListener('SIGINT', () => {
            this.Database.drop()
                .then(() => process.exit())
        })
    }
}

class UseView extends App {
    start() {
        const session = require('express-session')
        this.expressApp.use(session({
            secret: config.get('TOKEN_KEY'),
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }))

        this.expressApp.set('view engine', 'ejs')
        this.expressApp.set('views', './src/View')
        this.expressApp.use(this.express.static('Public'))


        const loginRoute = require('./Route/website/login.route')
        this.expressApp.use('/login', loginRoute)
        const studentsRoute = require('./Route/website/students.route')
        this.expressApp.use('/students/dashboard', studentsRoute)
        const teachersRoute = require('./Route/website/teachers.route')
        this.expressApp.use('/teachers/dashboard', teachersRoute)
        const adminRoute = require('./Route/website/admin.route')
        this.expressApp.use('/admin/dashboard', adminRoute)
    }
}

module.exports = { InitApp, RequestLogger, RequestParser, CORSHandler, Routes, ErrorHandlers, DeleteDBOnExit, UseView }