const User = require('../models/User')

const daoUsers={}

daoUsers.signup = (user)=>{
  return new Promise((resolved,reject)=>{
    let newUser = new User(user)
    newUser.save()
      .then(user=> resolved(user))
      .catch(error => reject(error))
  })
}

module.exports=daoUsers