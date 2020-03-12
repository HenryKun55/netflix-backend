require('dotenv').config();
const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')

consign({ verbose: true, locale: 'pt-br', cwd: 'src' })
  .include('middlewares')
  .into(app)

const { MONGO_USERNAME, MONGO_PASSWORD, PORT } = process.env

mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-t3xwu.mongodb.net/netflix?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.listen(proccess.end.PORT || PORT);