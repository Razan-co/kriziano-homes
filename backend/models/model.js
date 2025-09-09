const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User id is needed"],
    ref: "user",
  },
  house_no: {
    type: String,
    required: [true, "House no required"],
    trim: true,
  },
  fullName: {
    type: String,
    required: [true, "Fullname required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City name required"],
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, "Pincode required"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country name required"],
    trim: true,
  },
  district: {
    type: String,
    required: [true, "District name required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "phone number required"],
    trim: true,
  },
}, { timestamps: true })

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Provide category field"],
  },
}, { timestamps: true })

const wishListSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Provide user's id for whishlist"],
    ref: "user",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Provide products id for wishlist"],
    ref: "product",
  },
}, { timestamps: true })

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Provide user's id for cart"],
    ref: "user",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Provide products id for cart"],
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

const AddressModel = mongoose.model("address", addressSchema)
const CategoryModel = mongoose.model("category", categorySchema)
const WhishListModel = mongoose.model("whishlist", wishListSchema)
const CartModel = mongoose.model("cart", cartSchema)

module.exports = { AddressModel, CategoryModel, WhishListModel, CartModel }
