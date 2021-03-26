const express = require('express')
const rtStories = express.Router()
const daoStories = require('../dao/daoStories')

rtStories.post('/create',(req,res)=>{
  daoStories.create(req.body)
      .then(story=>res.json(story))
})

module.exports= rtStories