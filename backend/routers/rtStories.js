const express = require('express')
const rtStories = express.Router()
const storiesController = require('../controllers/storiesController')

rtStories.post('/create', storiesController.create)

module.exports= rtStories