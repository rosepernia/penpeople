const mongoose = require("mongoose")
const {Schema} = mongoose

mongoose.set('returnOriginal', false)
mongoose.set('runValidators', true)

const schemaStory = new Schema({
  blockid: { type: String, default:'' },
  active: { type: Boolean, default: true },
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
        return words.length>=100 && words.length<=250 ? true : false },
      message: "El fragmento ha de tener entre 100 y 250 palabras"
    }
  },
  image: { type: String, default:'' },
  closure: [{type: String}],
})

module.exports=mongoose.model('story',schemaStory)