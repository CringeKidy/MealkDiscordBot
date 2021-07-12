const mongoose = require('mongoose')
const ConnectionURL = process.env.CONNECTION_URL
const chalk = require("chalk")

module.exports = {
    init: () => {
        const dbOptions ={
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            useUnifiedTopology: true,
            useFindAndModify: false,
            poolSize: 500,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(ConnectionURL, dbOptions)
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log(chalk.red('Mongoose has successfully opened'))
        })
        
        mongoose.connection.on('err', err => {
            console.log(`There was an error while trying to connect \n ${err.stack}`)
        })

        mongoose.connection.on('disconnected', () => {
            console.log("Connection is now disconnected")
        })
    },
}