const express = require("express")
const {
  addCart, addProduct, addWhishList,
  getCart, getCategories, getProducts,
  getSingleProduct, getWishLists, removeCart,
  removeWishList, updateProduct
} = require("../controllers/productController")
const isAuthenticate = require("../middlewares/isAuthenticate")
const isAuthourized = require("../middlewares/permissionMiddleware")
const ProductValidation = require("../validators/productValidators")

const route = express.Router()
const prodVal = new ProductValidation()

route.post("/create-product", isAuthenticate, isAuthourized("admin"), prodVal.addProductValidate, addProduct)
route.get("/get-products", getProducts)
route.get("/get-product/:product_id", getSingleProduct)
  .put("/:id", isAuthenticate, isAuthourized("admin"), updateProduct)//add validation
route.get("/get-categories", getCategories)
route.post("/add-wishlist", isAuthenticate, addWhishList) // add validation
route.post("/add-cart", isAuthenticate, addCart) // add validation
route.post("/get-cart", isAuthenticate, getCart)
route.post("/get-wishlists", isAuthenticate, getWishLists)
route.delete("/remove-cart", isAuthenticate, removeCart)
route.delete("/remove-wishlist", isAuthenticate, removeWishList)

module.exports = route
