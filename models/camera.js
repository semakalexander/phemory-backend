const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    lens: [{ type: ObjectId, ref: 'Lens', required: true, default: [] }],
    image: { type: String },
    createdAt: { type: Date, default: Date.now() }
  },
  { versionKey: false }
)

let Camera

if (mongoose.models.Camera) {
  Camera = mongoose.model('Camera')
} else {
  Camera = mongoose.model('Camera', schema)
}

module.exports = Camera
