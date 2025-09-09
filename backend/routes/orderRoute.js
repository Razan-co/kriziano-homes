const express = require("express")
const {
  addCart,
  addProduct,
  addWhishList,
  getCart,
  getCategories,
  getProducts,
  getSingleProduct,
  getWishLists,
  removeCart,
  removeWishList,
} = require("../controllers/productController")
const isAuthenticate = require("../middlewares/isAuthenticate")
const isAuthourized = require("../middlewares/permissionMiddleware")
const ProductValidation = require("../validators/productValidators")
const {
  addAddress,
  createOrder,
  getAddress,
  verifyPayment,
} = require("../controllers/orderController")

const route = express.Router()

route.post("/create-address", isAuthenticate, isAuthourized("user"), addAddress)
route.get("/get-address", isAuthenticate, isAuthourized("user"), getAddress)
route.post("/create-order", isAuthenticate, isAuthourized("user"), createOrder)
route.post("/verify-payment", isAuthenticate, isAuthourized("user"), verifyPayment)

module.exports = route
