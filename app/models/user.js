const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  title: {type: String, required: true}
})
const Role = mongoose.model('Role', roleSchema)

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  token: String,
  name: {type: String, required:true},
  role: {
    type:mongoose.Schema.Types.ObjectId,
    ref: Role
  }
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

userSchema.virtual('examples', {
  ref: 'Example',
  localField: '_id',
  foreignField: 'owner'
});

const User = mongoose.model('User', userSchema)
module.exports = {User, Role}
