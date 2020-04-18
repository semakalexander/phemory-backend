const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

const schema = new Schema(
  {
    facebookId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    birthday: { type: Date },
    createdAt: { type: Date, default: Date.now() },
    cameras: [{ type: ObjectId, ref: 'Camera', required: true, default: [] }],
    token: String // Bearer
  },
  { versionKey: false }
)

let User

if (mongoose.models.User) {
  User = mongoose.model('User')
} else {
  User = mongoose.model('User', schema)
}

module.exports = User
