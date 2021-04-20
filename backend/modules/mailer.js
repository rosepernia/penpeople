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
      background-color: #f4f1f1;
    }
    a{
      cursor: pointer;
      text-decoration: none;
      font-size: 1.8em;
      border: 1px solid #c4c1c1;
      padding: 8px 16px;
      color: black;
    }
    a:hover{
      background-color: #d6d6d6;
    }
  </style>`
  if(subject=="Activar cuenta")
    return `<h1>¡Gracias por volver a PenPeople ${user.nickname}!</h1>
    <h2>Reactiva tu cuenta pulsando en el botón</h2>
    <a href="http://localhost:8080/validar/${user._id}" target="_blank">Confirmar cuenta</a>
    <style>
    body{
      padding: 25px 0;
      font-family: Arial;
      text-align: center;
      background-color: #f4f1f1;
    }
    a{
      cursor: pointer;
      text-decoration: none;
      font-size: 1.8em;
      border: 1px solid #c4c1c1;
      padding: 8px 16px;
      color: black;
    }
    a:hover{
      background-color: #d6d6d6;
    }
  </style>`
  if(subject=="Cambio de contraseña")
    return `<h1>¡Sentimos que hayas olvidado tu contraseña ${user.nickname}!</h1>
    <h2>Accede al cambio de contraseña a través de este enlace</h2>
    <a href="http://localhost:8080/cambiarcontrasena/${user._id}" target="_blank">Cambiar contraseña</a>
    <style>
    body{
      padding: 25px 0;
      font-family: Arial;
      text-align: center;
      background-color: #f4f1f1;
    }
    a{
      cursor: pointer;
      text-decoration: none;
      font-size: 1.8em;
      border: 1px solid #c4c1c1;
      padding: 8px 16px;
      color: black;
    }
    a:hover{
      background-color: #d6d6d6;
    }
  </style>`
}
    
module.exports = mailer