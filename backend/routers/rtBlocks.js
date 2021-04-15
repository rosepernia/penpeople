const express = require('express')
const rtBlocks = express.Router()
const blocksController = require('../controllers/blocksController')

rtBlocks.post('/create', blocksController.create)
rtBlocks.post('/edit', blocksController.edit)
rtBlocks.post('/findbyblockid', blocksController.findByBlockId)
rtBlocks.post('/delete', blocksController.delete)
rtBlocks.post('/publish', blocksController.publish)
rtBlocks.post('/like', blocksController.like)
rtBlocks.post('/findbyauthor', blocksController.findByAuthor)
rtBlocks.post('/findmoderateuser', blocksController.findModerateUser)
rtBlocks.post('/findmoderateadmin', blocksController.findModerateAdmin)
rtBlocks.post('/findmoderate', blocksController.findModerate)
rtBlocks.post('/listpublish', blocksController.listPublish)

module.exports= rtBlocks