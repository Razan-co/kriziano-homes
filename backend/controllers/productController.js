const asyncError = require("../middlewares/asyncError")
const Product = require("../models/productModel")
const { NotFoundError, ValidationError } = require("../utils/ErrorHandler")
const ApiFeatures = require("../utils/ApiFeatures")
const { CartModel, CategoryModel, WhishListModel } = require("../models/model")

// Add product -- /product/create-product
const addProduct = asyncError(async (req, res, next) => {
  const { name, price, description, stock, category, image_url } = req.body

  const cat = await CategoryModel.find({ name: category })
  if (!cat || cat.length === 0) await CategoryModel.create({ name: category })

  const product = await Product.create({ name, price, description, stock, category, image_url })
  if (!product) return next(new ValidationError("Product creation failed"))

  res.status(200).json({
    success: true,
    message: "Product has been created",
    product,
  })
})

// Get products -- /product/get-products
const getProducts = asyncError(async (req, res, next) => {
  const productQuery = new ApiFeatures(Product.find(), req.query).search().filter().pagination(8)
  const products = await productQuery.query
  res.status(200).json({
    success: true,
    products,
  })
})

// Get single product -- /get-product/:product_id
const getSingleProduct = asyncError(async (req, res, next) => {
  const { product_id } = req.params

  const product = await Product.findById(product_id)
  if (!product) return next(new NotFoundError("Product not found"))

  res.status(200).json({
    success: true,
    product,
  })
})

// Get categories -- /product/get-categories
const getCategories = asyncError(async (req, res, next) => {
  const categories = await CategoryModel.find()
  if (!categories || categories.length === 0) return next(new NotFoundError("Categories not found"))

  res.status(200).json({
    success: true,
    categories,
  })
})

// Add to wishlist -- /product/add-wishlist
const addWhishList = asyncError(async (req, res, next) => {
  const { product_id } = req.params
  await WhishListModel.create({ user_id: req.user._id, product_id })
  res.status(200).json({ success: true, message: "Added to wishlist" })
})

// Add to cart -- /product/add-cart
const addCart = asyncError(async (req, res, next) => {
  const { product_id } = req.params
  const { quantity } = req.body
  await CartModel.create({ user_id: req.user._id, product_id, quantity })
  res.status(200).json({ success: true, message: "Added to cart" })
})

// Get cart -- /product/get-cart
const getCart = asyncError(async (req, res, next) => {
  const carts = await CartModel.find({ user_id: req.user._id, isActive: true }).populate('product_id')
  res.status(200).json({
    success: true,
    carts,
  })
})

// Get wishlist -- /product/get-wishlists
const getWishLists = asyncError(async (req, res, next) => {
  const carts = await WhishListModel.find({ user_id: req.user._id }).populate('product_id')
  res.status(200).json({
    success: true,
    carts,
  })
})

// Remove wishlist -- /product/remove-wishlists
const removeWishList = asyncError(async (req, res, next) => {
  const { product_id } = req.params
  await WhishListModel.deleteOne({ user_id: req.user._id, product_id })
  res.status(200).json({ success: true, message: "Removed from wishlist" })
})

// Remove cart -- /product/remove-cart
const removeCart = asyncError(async (req, res, next) => {
  const { cart_id } = req.params
  await CartModel.deleteOne({ _id: cart_id })
  res.status(200).json({ success: true, message: "Removed from cart" })
})

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct,
  getCategories,
  addWhishList,
  addCart,
  getCart,
  getWishLists,
  removeWishList,
  removeCart,
}
