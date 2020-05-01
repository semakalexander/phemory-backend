const Lens = require('../models/lens')
const Camera = require('../models/camera')

const helpers = require('../helpers')

// @route  api/lenses
// @desc   get all lenses for camera
// @access private
const getLenses = async (req, res) => {
  let {
    query: {
      page = 0,
      perPage = 10,
      sortOrder = 'asc',
      sortBy = 'name',
      cameraId
    },
    user
  } = req

  console.log('GET /lenses ', { cameraId, user })

  if (Number.isNaN(page)) page = 0
  if (Number.isNaN(perPage)) perPage = 10

  const exist = await Camera.findOne({ _id: cameraId, userId: user._id })

  if (!exist) return res.json({ ok: false, error: 'No such camera' })

  Promise.all([
    Lens.countDocuments(),
    Lens.find({ cameraId })
      .skip(page * perPage)
      .limit(+perPage)
      .sort({ [sortBy]: sortOrder.toLowerCase() })
  ])
    .then(([count, lenses]) =>
      res.json({
        lenses: lenses.map(l => l.toClient()),
        count
      })
    )
    .catch((err) => res.status(500).json(err))
}

// @route  api/lenses
// @desc   create new lens for camera
// @access private
const createLens = (req, res) => {
  const {
    body: {
      name,
      image,
      cameraId
    },
    user
  } = req

  helpers.logs.log('Lens creating: ', { name, image, user, cameraId })

  Lens
    .create({ name, image, cameraId })
    .then(lens => res.json(lens.toClient()))
    .catch(error => {
      helpers.logs.log(error)
      res.status(500).json(error)
    })
}

module.exports = {
  getLenses,
  createLens
}
