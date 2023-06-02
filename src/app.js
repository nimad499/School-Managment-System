const appDecorators = require('./appDecorators')

function test(type) {
    let app = new appDecorators.InitApp()
    app = new appDecorators.RequestParser(app)
    app = new appDecorators.CORSHandler(app)
    app = new appDecorators.Routes(app)
    app = new appDecorators.ErrorHandlers(app, type)
    app = new appDecorators.DeleteDBOnExit(app)

    return app.expressApp
}

function demo(type) {
    let app = new appDecorators.InitApp()
    app = new appDecorators.RequestLogger(app)
    app = new appDecorators.RequestParser(app)
    app = new appDecorators.CORSHandler(app)
    if (type == 'website')
        app = new appDecorators.UseView(app)
    else if (type == 'api')
        app = new appDecorators.Routes(app)
    app = new appDecorators.ErrorHandlers(app, type)

    return app.expressApp
}

function production(type) {
    let app = new appDecorators.InitApp()
    app = new appDecorators.RequestParser(app)
    app = new appDecorators.CORSHandler(app)
    if (type == 'website')
        app = new appDecorators.UseView(app)
    else if (type == 'api')
        app = new appDecorators.Routes(app)
    app = new appDecorators.ErrorHandlers(app, type)

    return app.expressApp
}

module.exports = { test, demo, production }