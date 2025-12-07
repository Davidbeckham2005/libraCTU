const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        uri: process.env.MONGOB_URI || "mongodb://127.0.0.1:27017/book"
    }
}
module.exports = config;