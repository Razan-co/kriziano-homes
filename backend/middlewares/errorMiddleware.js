const { AppError } = require('../utils/ErrorHandler')

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || "Internal Server Error"

  // Mongoose Duplicate Key Error (E11000)
  if (err.cause && err.cause.code === 11000) {
    const field = Object.keys(err.cause.keyValue)[0]
    const message = `${field === 'phone' ? field + " number" : field} already exists. Please use another value.`
    err = new AppError(message, 409)
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    err = new AppError(message, 400)
  }

  // Mongoose Cast Error (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`
    err = new AppError(message, 400)
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.stack && { details: err.stack })
    })
  }

  console.log("Unhandled error", err)

  return res.status(500).json({
    success: false,
    status: "error",
    message: "something went wrong ,please try again"
  })
}

module.exports = errorMiddleware
