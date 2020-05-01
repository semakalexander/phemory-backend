if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const routes = require('./routes/index')

const helpers = require('./helpers')

passport.use(helpers.jwt.bearerStrategy)

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongodDB is connected'))
  .catch((err) => console.error(err))
mongoose.set('useCreateIndex', true)

const app = new Express()
const PORT = process.env.PORT || 9000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/static', Express.static('static'))

app.use('/api', routes)

app.listen(PORT, () =>
  console.log(`Server successfully started at http://localhost:${PORT}/`)
)
