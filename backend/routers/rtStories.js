const express = require('express')
const rtStories = express.Router()
const daoStories = require('../dao/daoStories')

rtStories.post('/create',(req,res)=>{
  daoStories.create(req.body)
      .then(story=>res.json(story))
      .catch(error => {
        let errors = {}
        if (error.errors.title) errors.title = error.errors.title.message
        if (error.errors.author) errors.author = error.errors.author.message
        if (error.errors.review) errors.review = error.errors.review.message
        if (error.errors.body) errors.body = error.errors.body.message
        if (error.errors.image) errors.image = error.errors.image.message
        res.json({
          errors: errors
        })
      })
})

module.exports= rtStories