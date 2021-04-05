const nodemailer = require("nodemailer")

const mailer = {}

mailer.send = function send(user,subject) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'lenny.toy65@ethereal.email',
      pass: 'gx5x5QtWknr6DTCfne'
    }
  })

  transporter.sendMail({
    from: 'PenPeople',
    to: user.email,
    subject: subject,
    html: template(user,subject)
  })
}

function template(user,subject){
  if(subject=="Registro usuario nuevo")
    return `<h1>¡Gracias por registarte ${user.nickname}!</h1>
    <h2>Confirma tu cuenta pulsando en el botón</h2>
    <a href="http://localhost:8080/validar/${user._id}" target="_blank">Confirmar cuenta</a>
    <style>
    body{
      padding: 25px 0;
      font-family: Arial;
      text-align: center;
    }
    a{
      font-size: 1.8em;
      text-decoration: none;
      padding: 10px;
      margin: 25px;
      height: 30px;
      background-color: rgb(138, 204, 241);
      color: white;
      border: 1px solid black;
      border-radius: 8px;
      box-shadow: 2px 2px 2px black;
      font-weight: bolder;
      font-size: 1.2em;
      text-shadow: 1px 1px 2px black;
      cursor: pointer;
    }
  </style>`
}
    
module.exports = mailer