const mongoose = require('mongoose')
const ConnectionURL = require('../Jsons/mongodb.json')

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

        mongoose.connect(ConnectionURL.url, dbOptions)
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose has successfully opened')
        })
        
        mongoose.connection.on('err', err => {
            console.log(`There was an error while trying to connect \n ${err.stack}`)
        })

        mongoose.connection.on('disconnected', () => {
            console.log("Connection is now disconnected")
        })
    },
}