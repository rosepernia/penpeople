const express = require('express')
const rtUsers = express.Router()
const usersController = require('../controllers/usersController')

rtUsers.post('/create', usersController.signup)
rtUsers.post('/validate', usersController.validate)
//rtUsers.post('/login', usersController.login)
rtUsers.post('/list', usersController.list)
rtUsers.post('/findbynickname', usersController.findByNickname)
rtUsers.post('/edit', usersController.edit)
rtUsers.post('/delete', usersController.delete)

module.exports= rtUsers