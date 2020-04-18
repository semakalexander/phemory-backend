const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    films: [{ type: ObjectId, ref: 'Film', required: true, default: [] }],
    image: { type: String },
    createdAt: { type: Date, default: Date.now() }
  },
  { versionKey: false }
)

let Lens

if (mongoose.models.Lens) {
  Lens = mongoose.model('Lens')
} else {
  Lens = mongoose.model('Lens', schema)
}

module.exports = Lens
