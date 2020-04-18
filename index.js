const Express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const cors = require('cors')

const keys = require('./keys')
const routes = require('./routes/index')

const User = require('./models/user')

passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      const user = await User.findOne({ token })
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
))

mongoose
  .connect(keys.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
