module.exports = {
    mongo : {
        url:'',
        option: {
            reconnectTries: 86400,
            auto_reconnect: true,
            poolSize : 40,
            connectTimeoutMS: 500,
            useNewUrlParser: true,
        }
    }
}