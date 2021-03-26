const express = require('express')
const rtUsers = express.Router()
const daoUsers = require('../dao/daoUsers')

rtUsers.post('/create',(req,res)=>{
  daoUsers.signup(req.body)
    .then(user=>res.json(user))
    .catch(error => {
      let errors = {}
      if (error.code == 11000) {
        if(error.keyPattern.nickname) errors.repeat = "Este nickname ya está cogido"
        if(error.keyPattern.email) errors.repeat = "Este email ya está registrado"
      }
      else {
        if (error.errors.firstname) errors.firstname = error.errors.firstname.message
        if (error.errors.lastname) errors.lastname = error.errors.lastname.message
        if (error.errors.nickname) errors.nickname = error.errors.nickname.message
        if (error.errors.email) errors.email = error.errors.email.message
        if (error.errors.password) errors.password = error.errors.password.message
        if (error.errors.bio) errors.bio = error.errors.bio.message
      }
      res.json({
        errors: errors
      })
    })
})

module.exports= rtUsers