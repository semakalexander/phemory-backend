const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema(
  {
    facebookId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    birthday: { type: Date },
    createdAt: { type: Date, default: Date.now() },
    token: String // Bearer
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

let User

if (mongoose.models.User) {
  User = mongoose.model('User')
} else {
  User = mongoose.model('User', schema)
}

module.exports = User
