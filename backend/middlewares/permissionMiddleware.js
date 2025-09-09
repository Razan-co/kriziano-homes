const { AuthError } = require('../utils/ErrorHandler')

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AuthError(`Access denied for role: ${req.user.role}`))
    }
    next()
  }
}

module.exports = isAuthorized
