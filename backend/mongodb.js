const mongoose = require('mongoose')

let data={
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}

mongoose.connect(`mongodb+srv://${data.user}:${data.pass}@${data.host}/${data.name}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
})

module.exports=mongoose.connection
