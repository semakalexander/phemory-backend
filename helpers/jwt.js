const jwt = require('jsonwebtoken')

const keys = require('../keys')

const sign = data => jwt.sign({ data }, keys.JWT_SECRET, { expiresIn: '24h' })

const verify = token => {
  try {
    return jwt.verify(token, keys.JWT_SECRET)
  } catch (error) {
    return { error }
  }
}

module.exports = {
  sign,
  verify
}
