const helpers = require('../helpers')
const User = require('../models/User')

// @route  api/users
// @desc   get all users
// @access public
const getUsers = (req, res) => {
  let {
    query: { page = 0, perPage = 10, sortOrder = 'asc', sortBy = 'username' }
  } = req

  if (Number.isNaN(page)) page = 0
  if (Number.isNaN(perPage)) perPage = 10
  if (!sortOrder) sortOrder = 'asc'
  if (!sortBy) sortBy = 'username'

  Promise.all([
    User.countDocuments(),
    User.find()
      .skip(page * perPage)
      .limit(+perPage)
      .sort({ [sortBy]: sortOrder.toLowerCase() })
  ])
    .then(([count, users]) =>
      res.json({
        users: users.map((u) => helpers.common.omit(u.toObject(), 'password')),
        count
      })
    )
    .catch((err) => res.status(500).json(err))
}

const createUser = async (req, res) => {
  const { facebookId, email, firstName, lastName, birthday, gender } = req.body

  helpers.logs.log(`${firstName} ${lastName} sign in.`)

  const user = await User.findOne({ facebookId })

  if (!user) {
    const token = helpers.jwt.sign(facebookId)

    const newUser = await User.create({
      facebookId,
      email,
      firstName,
      lastName,
      birthday,
      gender,
      token
    })

    return res.json(newUser)
  }

  const { error } = helpers.jwt.verify(user.token)

  if (error) {
    return await User.findOneAndUpdate({ facebookId }, { token: helpers.jwt.sign(facebookId) })
  }

  return res.json(user)
}

module.exports = {
  getUsers,
  createUser
}
