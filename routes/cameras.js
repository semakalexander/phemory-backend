const express = require('express')
const passport = require('passport')

const cameraController = require('../controllers').cameras

const router = express.Router()

router.get('/', passport.authenticate('bearer', { session: false }), cameraController.getCameras)
router.post('/', passport.authenticate('bearer', { session: false }), cameraController.createCamera)

module.exports = router
