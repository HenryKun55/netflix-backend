const mongoose = require('mongoose')
const { MONGO_USERNAME, MONGO_PASSWORD} = process.env

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-t3xwu.mongodb.net/netflix?retryWrites=true&w=majority`

function connection() {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}

module.exports = {
    url,
    connection
}