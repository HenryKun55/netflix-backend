const express = require('express')
const passport = require('passport')

const multerConfig = require('./config/multer')
const multer = require('multer')(multerConfig).single('file')

const jwtAuth = passport.authenticate('jwt', {session: false})

const routes = express.Router()

const UserController = require('./controllers/UserController')
const MovieController = require('./controllers/MovieController')

routes.post('/user', UserController.store)
routes.post('/user/photo',[jwtAuth, multer], UserController.update)
routes.post('/login', UserController.login)
routes.post('/token', UserController.checkToken)
routes.post('/movie', jwtAuth , MovieController.store)
routes.get('/movie/:id', jwtAuth , MovieController.show)

module.exports = routes