require('dotenv').config()
const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars')

const mailer = {}

mailer.send = function send(user,subject) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASSWORD,
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
} 

module.exports = mailer