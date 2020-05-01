const express = require('express')

const passport = require('passport')

const userController = require('../controllers').users

const router = express.Router()

router.get('/', passport.authenticate('bearer', { session: false }), userController.getUsers)

router.post('/', userController.createUser)

module.exports = router
