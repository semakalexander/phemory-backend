const express = require('express')
const passport = require('passport')

const filmController = require('../controllers').films

const router = express.Router()

router.get('/', passport.authenticate('bearer', { session: false }), filmController.getFilms)
router.post('/', passport.authenticate('bearer', { session: false }), filmController.createFilm)

module.exports = router
