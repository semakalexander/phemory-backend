const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    iso: { type: Number, required: true },
    image: { type: String },
    lensId: { type: String, ref: 'Lens', required: true },
    createdAt: { type: Date, default: Date.now() }
  },
  { versionKey: false }
)

schema.method('toClient', function () {
  var obj = this.toObject()

  // Rename fields
  obj.id = obj._id
  delete obj._id

  return obj
})

let Film

if (mongoose.models.Film) {
  Film = mongoose.model('Film')
} else {
  Film = mongoose.model('Film', schema)
}

module.exports = Film
