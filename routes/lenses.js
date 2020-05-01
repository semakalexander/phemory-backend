const express = require('express')
const passport = require('passport')

const lensController = require('../controllers').lenses

const router = express.Router()

router.get('/', passport.authenticate('bearer', { session: false }), lensController.getLenses)
router.post('/', passport.authenticate('bearer', { session: false }), lensController.createLens)

module.exports = router
