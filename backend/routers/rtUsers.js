const express = require('express')
const rtUsers = express.Router()
const usersController = require('../controllers/usersController')

rtUsers.post('/create', usersController.signup)
rtUsers.post('/validate', usersController.validate)

module.exports= rtUsers