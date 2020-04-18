const router = require('express').Router();

const users = require('./users');
const cameras = require('./cameras');

router.use('/users', users)
router.use('/cameras', cameras);

router.use('/', (req, res) => res.status(404).json({ ok: false, error: 'Not found'}))

module.exports = router;
