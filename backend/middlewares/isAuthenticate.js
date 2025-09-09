const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/userModel')
const { AuthError, ValidationError } = require('../utils/ErrorHandler')

dotenv.config()

const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.cookies.homes_auth
    if (!auth) return next(new AuthError("Login to access this resources"))

    const jwtSec = process.env.JWT_SECRET
    if (!jwtSec) return next(new ValidationError("Jwt_secret is not found"))

    const decoded = jwt.verify(auth, jwtSec)
    if (!decoded._id) return next(new AuthError("Invalid token, login again"))

    const user = await User.findById(decoded._id)
    if (!user) return next(new AuthError("User not found with this token"))

    req.user = user
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    return next(new AuthError("Login to acces this resources"))
  }
}

module.exports = authMiddleware
