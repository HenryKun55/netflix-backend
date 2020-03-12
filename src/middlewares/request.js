const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const routes = require('../routes')
const bodyParser = require('body-parser')

module.exports = app => { 
    app.use(cors())
    app.use(express.urlencoded({ 
        extended: false 
    }))
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(routes)
}