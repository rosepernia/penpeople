const User = require('../models/User')
const mailer = require("../modules/mailer")

const usersController = {}

usersController.signup = (req, res) => {
  let newUser = new User(req.body)
  newUser.save()
    .then(user => {
      mailer.send(user, "Registro usuario nuevo")
      res.json(user)
    })
    .catch(error => {
      let errors = {}
      if (error.code == 11000) {
        if (error.keyPattern.nickname) errors.repeat = "Este nickname ya está cogido"
        if (error.keyPattern.email) errors.repeat = "Este email ya está registrado"
      }
      else {
        if (error.errors.firstname) errors.firstname = error.errors.firstname.message
        if (error.errors.lastname) errors.lastname = error.errors.lastname.message
        if (error.errors.nickname) errors.nickname = error.errors.nickname.message
        if (error.errors.email) errors.email = error.errors.email.message
        if (error.errors.password) errors.password = error.errors.password.message
      }
      res.json(errors)
    })
}

usersController.validate = (req, res) => {
  User.findByIdAndUpdate(req.body, { active: true })
    .then(user => res.json(user))
    .catch(() => res.json(null))
}

usersController.login = (req, res) => {
  //Queda pendiente cuando veamos passport
}

usersController.list = (req, res) => {
  User.find({ nickname: { $regex: `.*${req.body.nickname}.*`, $options: 'i' }, active: true, admin:req.body.admin }).lean()
    .then(users => res.json(users))
}

usersController.findByNickname = (req, res) => {
  User.findOne({ nickname: req.body.nickname })
    .then(user => res.json(user))
    .catch(() => res.json(null))
}

usersController.edit = (req, res) => {
  let newUser = new User(req.body)
  User.findOneAndUpdate({ email: newUser.email }, { firstname: newUser.firstname, lastname: newUser.lastname, nickname: newUser.nickname, avatar: newUser.avatar, bio: newUser.bio, instagram: newUser.instagram, twitter: newUser.twitter, other: newUser.other })
    .then(user => res.json(user))
    .catch(error => {
      let errors = {}
      if (error.code == 11000) errors.repeat = "Este nickname ya está cogido"
      else {
        if (error.errors.firstname) errors.firstname = error.errors.firstname.message
        if (error.errors.lastname) errors.lastname = error.errors.lastname.message
        if (error.errors.nickname) errors.nickname = error.errors.nickname.message
        if (error.errors.bio) errors.bio = error.errors.bio.message
      }
      res.json(errors)
    })
}

usersController.delete = (req, res) => {
  User.findOneAndRemove({ email: req.body.email })
    .then(() => res.json("Usuario eliminado con éxito"))
}

module.exports = usersController