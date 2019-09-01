module.exports = {
    mongo : {
        url:'mongodb://localhost:27017',
        option: {
            reconnectTries: 86400,
            auto_reconnect: true,
            poolSize : 40,
            connectTimeoutMS: 500,
            useNewUrlParser: true,
        },
        tables: 'trade'
    }
}