const express = require("express")
const { createUser, login } = require("../controllers/authController")
const { AuthValidation, validateRequest } = require("../validators/authValidators")
const isAuthenticate = require("../middlewares/isAuthenticate")

const route = express.Router()
const authVal = new AuthValidation()

route.post("/create-user", authVal.userValidationRules, validateRequest, createUser)
route.post("/login", authVal.loginVaildationRules, validateRequest, login)
route.get("/get-user", isAuthenticate, (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
})

module.exports = route
