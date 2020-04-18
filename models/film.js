const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    iso: { type: Number, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now() }
  },
  { versionKey: false }
)

let Film

if (mongoose.models.Film) {
  Film = mongoose.model('Film')
} else {
  Film = mongoose.model('Film', schema)
}

module.exports = Film
