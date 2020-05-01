const Film = require('../models/film')
const Lens = require('../models/lens')
const Camera = require('../models/camera')

const helpers = require('../helpers')

// @route  api/films
// @desc   get all films for lens
// @access private
const getFilms = async (req, res) => {
  let {
    query: {
      page = 0,
      perPage = 10,
      sortOrder = 'asc',
      sortBy = 'name',
      lensId
    },
    user
  } = req

  helpers.logs.log('GET /films ', { lensId, user })

  if (Number.isNaN(page)) page = 0
  if (Number.isNaN(perPage)) perPage = 10

  const parentLens = await Lens.findOne({ _id: lensId })

  const parentCamera = await Camera.findOne({ _id: parentLens.cameraId, userId: user._id })

  if (!parentCamera) return res.json({ ok: false, error: 'No such film' })

  Promise.all([
    Film.countDocuments(),
    Film.find({ lensId })
      .skip(page * perPage)
      .limit(+perPage)
      .sort({ [sortBy]: sortOrder.toLowerCase() })
  ])
    .then(([count, films]) =>
      res.json({
        films: films.map(l => l.toClient()),
        count
      })
    )
    .catch((err) => res.status(500).json(err))
}

// @route  api/films
// @desc   create new film for lens
// @access private
const createFilm = (req, res) => {
  const {
    body: {
      name,
      iso,
      image,
      lensId
    },
    user
  } = req

  helpers.logs.log('Film creating: ', { name, image, user, iso, lensId })

  Film
    .create({ name, image, iso, lensId })
    .then(film => res.json(film.toClient()))
    .catch(error => {
      helpers.logs.log(error)
      res.status(500).json(error)
    })
}

module.exports = {
  getFilms,
  createFilm
}
