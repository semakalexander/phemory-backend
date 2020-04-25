const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    userId: { type: ObjectId, ref: 'User', required: true },
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

let Camera

if (mongoose.models.Camera) {
  Camera = mongoose.model('Camera')
} else {
  Camera = mongoose.model('Camera', schema)
}

module.exports = Camera
