process.env["NODE_CONFIG_DIR"] = "./src/Config"
const config = require("config")
const PORT = config.get('serverPort')

const type = process.argv[2]
if (type != 'website' && type != 'api') {
    throw new Error('Type is not correct')
}
let app = require('./src/app')
app = app[process.env['NODE_ENV']](type)
// let app = require('./src/app').demo(process.argv[2])

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
