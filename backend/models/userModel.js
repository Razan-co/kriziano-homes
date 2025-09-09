const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email has already taken'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Provide a phone number"],
    unique: [true, "Phone Number has already taken."],
    validate: {
      validator: (val) => validator.isMobilePhone(val, 'en-IN'),
      message: "Enter a valid Indian mobile phone number",
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 11)
  next()
})

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  )
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
