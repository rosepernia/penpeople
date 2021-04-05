const mongoose = require("mongoose")
const {Schema} = mongoose
const bcrypt = require('bcrypt')

mongoose.set('returnOriginal', false)

const schemaUser = new Schema({
  firstname: {
    type: String,
    required: [true, "Introduce un nombre"],
    uppercase: true,
    validate: {
      validator: function (firstname) { return /^[a-zÀ-ÿ\u00f1\u00d1\s]{2,25}$/i.test(firstname) },
      message: "El nombre no es válido"
    }
  },
  lastname: {
    type: String,
    required: [true, "Introduce un apellido"],
    uppercase: true,
    validate: {
      validator: function (lastname) { return /^[a-zÀ-ÿ\u00f1\u00d1\s]{2,25}$/i.test(lastname) },
      message: "El apellido no es válido"
    }
  },
  email: {
    type: String,
    required: [true, "Introduce un email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (email) { return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email) },
      message: "El email no es válido"
    }
  },
  nickname: {
    type: String,
    required: [true, "Introduce un nickname"],
    unique: true,
    validate: {
      validator: function (nickname) { return /^[a-zÀ-ÿ0-9\u00f1\u00d1\s]{4,12}$/i.test(nickname) },
      message: "El nickname no es válido"
    }
  },
  password: {
    type: String,
    required: [true, "Introduce una contraseña"],
    validate: {
      validator: function (password) { return /^.{6,15}$/i.test(password) },
      message: "La contraseña ha de tener un mínimo de 6 letras o números"
    },
  },
  active: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  likes: { type: Number, default:0},
  avatar: { type: String, default:"./img/users/default.jpg"},
  bio: {
    type: String,
    validate: {
      validator: function (bio) { return /^.{10,200}$/i.test(bio) },
      message: "La bio no puede superar los 200 caracteres"
    }
  },
  instagram: {type: String, default: ""},
  twitter: {type: String, default: ""},
  other: {type: String, default: ""}
})

module.exports=mongoose.model('User',schemaUser)