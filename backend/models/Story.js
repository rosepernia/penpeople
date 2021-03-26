const mongoose = require("mongoose")
const {Schema} = mongoose


const schemaStory = new Schema({
  active: { type: Boolean, default: false },
  title: { 
    type: String,
    required: [true, "Introduce un título"],
  },
  author: { 
    type: String,
    required: [true, "Introduce el autor"],
  },
  review: {
    type: String,
    required: [true, "Introduce una reseña"],
    validate: {
      validator: function (review) { return /^.{0,150}$/i.test(review) },
      message: "La reseña no puede superar los 150 caracteres"
    }
  },
  body:  {
    type: String,
    validate: {
      validator: function (body) { 
        let text = body.replace(/\r?\n/g," ").replace(/[ ]+/g," ").replace (/^ /,"").replace (/ $/,"")
        let words = text.split(" ")
        return words.length>=200 && words.length<=500 ? true : false },
      message: "El fragmento ha de tener entre 200 y 500 palabras"
    }
  },
  image: { type: String, required: [true, "Introduce una imagen"]},
  closure: [{type: String}],
})

module.exports=mongoose.model('Story',schemaStory)