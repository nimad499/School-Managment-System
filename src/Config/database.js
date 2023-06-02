const config = require('config')
const database_URI = config.get('database_URI')
const mongoose = require('mongoose')

const Database = (function () {
    let shouldDropDatabase = false

    function connect() {
        mongoose
            .connect(database_URI, {
                autoIndex: true
            })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch((err) => {
                console.error(`Database connection error : ${err}`)
            })
    }

    async function disconnect() {
        if (shouldDropDatabase)
            throw ('Waiting for database to be dropped')

        await mongoose.connection.close()
            .then(() => {
                console.log('Database connection closed');
            })
    }

    async function drop() {
        shouldDropDatabase = true

        await mongoose.connection.dropDatabase()
            .then((res, err) => {
                if (res) {
                    console.log('Database dropped:', res)
                } else {
                    console.log('Error dropping database:', err)
                }
            })

        shouldDropDatabase = false
        await disconnect()
    }

    return {
        connect: connect,

        disconnect: disconnect,

        drop: drop
    }
})()

module.exports = Database