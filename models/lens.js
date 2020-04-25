const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    cameraId: { type: ObjectId, ref: 'Camera', required: true },
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

let Lens

if (mongoose.models.Lens) {
  Lens = mongoose.model('Lens')
} else {
  Lens = mongoose.model('Lens', schema)
}

module.exports = Lens
