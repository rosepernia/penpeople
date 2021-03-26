const express = require('express')
const rtBlocks = express.Router()
const daoBlocks = require('../dao/daoBlocks')

rtBlocks.post('/create',(req,res)=>{
  daoBlocks.create(req.body)
      .then(block=>res.json(block))
      .catch(error => {
        let errors = {}
        if (error.errors.body) errors.body = error.errors.body.message
        res.json({
          errors: errors
        })
      })
})

module.exports= rtBlocks