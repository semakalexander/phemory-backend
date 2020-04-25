const jwt = require('jsonwebtoken')
const BearerStrategy = require('passport-http-bearer').Strategy

const keys = require('../keys')

const User = require('../models/user')

const sign = data => jwt.sign({ data }, keys.JWT_SECRET, { expiresIn: '24h' })

const verify = token => {
  try {
    return jwt.verify(token, keys.JWT_SECRET)
  } catch (error) {
    return { error }
  }
}

const bearerStrategy = new BearerStrategy(
  async (token, done) => {
    try {
      const user = await User.findOne({ token })
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
)

module.exports = {
  sign,
  verify,
  bearerStrategy
}
