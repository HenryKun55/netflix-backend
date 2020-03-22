require('dotenv').config();
const app = require('express')()
const consign = require('consign')
const mongoose = require('./config/mongoose')

const port = 3333

consign({ verbose: true, locale: 'pt-br', cwd: 'src' })
  .include('middlewares')
  .into(app)

mongoose.connection();

app.listen(process.env.PORT || port);