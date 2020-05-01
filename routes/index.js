const router = require('express').Router()

const users = require('./users')
const cameras = require('./cameras')
const lenses = require('./lenses')
const films = require('./films')

router.use('/users', users)
router.use('/cameras', cameras)
router.use('/lenses', lenses)
router.use('/films', films)

router.use('/', (req, res) => res.status(404).json({ ok: false, error: 'Not found' }))

module.exports = router
