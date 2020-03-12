const express = require('express')
const passport = require('passport')

const jwtAuth = passport.authenticate('jwt', {session: false})

const routes = express.Router()

const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')

routes.post('/user', UserController.store)
routes.post('/login', UserController.login)
routes.post('/token', UserController.checkToken)
routes.get('/home', jwtAuth , UserController.show)
routes.post('/movie', jwtAuth , MovieController.store)
routes.get('/movie/:id', jwtAuth , MovieController.show)

module.exports = routes