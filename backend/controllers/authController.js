const asyncError = require("../middlewares/asyncError")
const User = require("../models/userModel")
const { AuthError, ValidationError } = require("../utils/ErrorHandler")
const AuthHelper = require("../utils/AuthHelper")

// Create user - /create-user
const createUser = asyncError(async (req, res, next) => {
  const { email, name, password, phone } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new ValidationError("User already exists with this email!"))
  }

  const user = await User.create({ email, name, password, phone })

  if (!user) {
    return next(new AuthError("User creation failed"))
  }

  return new AuthHelper().sendCookie(res, user)
})

// Login user - /login
const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ValidationError("Invalid Email or password"))
  }
  if (!(await user.isValidPassword(password))) {
    return next(new ValidationError("Invalid Email or password"))
  }

  return new AuthHelper().sendCookie(res, user)
})

module.exports = {  createUser,  login}
