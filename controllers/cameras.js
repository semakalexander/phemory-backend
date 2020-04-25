const Camera = require('../models/camera')

const helpers = require('../helpers')

// @route  api/cameras
// @desc   get all cameras for user
// @access private
const getCameras = (req, res) => {
  let {
    query: {
      page = 0,
      perPage = 10,
      sortOrder = 'asc',
      sortBy = 'name'
    },
    user
  } = req

  if (Number.isNaN(page)) page = 0
  if (Number.isNaN(perPage)) perPage = 10

  Promise.all([
    Camera.countDocuments(),
    Camera.find({ userId: user._id })
      .skip(page * perPage)
      .limit(+perPage)
      .sort({ [sortBy]: sortOrder.toLowerCase() })
  ])
    .then(([count, cameras]) =>
      res.json({
        cameras: cameras.map(c => c.toClient()),
        count
      })
    )
    .catch((err) => res.status(500).json(err))
}

// @route  api/cameras
// @desc   create new camera for user
// @access private
const createCamera = (req, res) => {
  const {
    body: {
      name,
      image
    },
    user
  } = req

  helpers.logs.log('Camera creating: ', { name, image, user })

  Camera
    .create({ name, image, userId: user._id })
    .then(camera => res.json(camera.toClient()))
    .catch(error => {
      helpers.logs.log(error)
      res.status(500).json(error)
    })
}

module.exports = {
  getCameras,
  createCamera
}
