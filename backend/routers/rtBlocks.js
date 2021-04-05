const express = require('express')
const rtBlocks = express.Router()
const blocksController = require('../controllers/blocksController')

rtBlocks.post('/create', blocksController.create)

module.exports= rtBlocks