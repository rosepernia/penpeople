require('dotenv').config()
const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars')

const mailer = {}

mailer.send = function send(subject,user,story,block) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASSWORD
    }
  })

  transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: 'views',
  }))

  transporter.sendMail({
    from: process.env.NM_USER,
    to: user.email,
    subject: subject,
    template: changeTemplate (subject), 
    context: {
      id: user._id,
      nickname: user.nickname,
      story: story,
      block: block
    }
  })
}

function changeTemplate (subject){
  if(subject=="Registro usuario nuevo")
    return ('welcome')
  if(subject=="Activar cuenta")
    return ('validate')
  if(subject=="Cambio de contraseña")
    return ('changepassword')
  if(subject=="Fragmento enviado")
    return ('blocksent')
  if(subject=="Fragmentos pendientes de moderación")
    return ('moderate')
  if(subject=="¡Te han publicado!")
    return ('blockpublished')
} 

module.exports = mailer