const express = require('express')
const passport = require('passport')

const routes = express.Router()

const auth = passport.authenticate('jwt', { session: false })

const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')

routes.post('/user', UserController.store)
routes.post('/login', UserController.login)
routes.post('/token', UserController.checkToken)
routes.get('/home', auth , UserController.show)

module.exports = routes