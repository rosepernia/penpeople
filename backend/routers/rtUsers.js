const express = require('express')
const rtUsers = express.Router()
const usersController = require('../controllers/usersController')

rtUsers.post('/create', usersController.signup)

module.exports= rtUsers