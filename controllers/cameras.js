const Camera = require('../models/camera')

// @route  api/cameras
// @desc   get all cameras for user
// @access private
const getCameras = (req, res) => {
  let {
    query: { page = 0, perPage = 10, sortOrder = 'asc', sortBy = 'name' }
  } = req

  if (Number.isNaN(page)) page = 0
  if (Number.isNaN(perPage)) perPage = 10

  Promise.all([
    Camera.count(),
    Camera.find()
      .skip(page * perPage)
      .limit(+perPage)
      .sort({ [sortBy]: sortOrder.toLowerCase() })
  ])
    .then(([count, cameras]) =>
      res.json({
        cameras,
        count
      })
    )
    .catch((err) => res.status(500).json(err))
}

module.exports = {
  getCameras
}
