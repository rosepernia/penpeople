const express = require('express')
const rtStories = express.Router()
const storiesController = require('../controllers/storiesController')

rtStories.post('/create', storiesController.create)
rtStories.post('/list', storiesController.list)
rtStories.post('/findbyid', storiesController.findById)
rtStories.post('/state', storiesController.state)

module.exports= rtStories