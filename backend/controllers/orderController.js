const asyncError = require("../middlewares/asyncError")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const { AddressModel } = require("../models/model")
const { AuthError, NotFoundError, ValidationError } = require("../utils/ErrorHandler")
const Order = require("../models/orderModel")
const ProductModel = require("../models/productModel")

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Create order -- /order/create-order/
const createOrder = asyncError(async (req, res, next) => {
  const { products, address: addressId } = req.body

  if (!products || products.length === 0)
    return next(new ValidationError("No products provided"))

  if (!addressId) return next(new ValidationError("Shipping address is required"))

  const address = await AddressModel.findById(addressId)
  if (!address) return next(new NotFoundError("Shipping address not found"))

  let totalAmount = 0
  const orderItems = []

  for (const item of products) {
    const product = await ProductModel.findById(item.productId)
    if (!product) return next(new NotFoundError(`Product with ID ${item.productId} not found`))

    const productTotal = product.price * item.quantity
    totalAmount += productTotal

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price,
    })
  }

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(totalAmount * 100), // amount in paise
    currency: "INR",
    receipt: `order_${Date.now()}`,
  })

  // Create order in DB
  const order = await Order.create({
    user: req.user._id,
    products: orderItems,
    totalAmount,
    shippingAddress: address._id,
    razorpayOrderId: razorpayOrder.id,
    status: "pending",
  })

  res.status(201).json({
    success: true,
    orderId: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    key: process.env.RAZORPAY_KEY_ID,
  })
})

// Verify Razorpay payment -- /order/verify-payment
const verifyPayment = asyncError(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ValidationError("Missing required payment fields")
  }

  // Fetch order from DB
  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id })
  if (!order) throw new NotFoundError("Order not found")

  // Generate signature to verify
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex")

  if (generated_signature !== razorpay_signature) throw new ValidationError("Payment verification failed")

  // Payment verified - update order status
  order.status = "paid"
  order.payment = order.payment || {}
  order.payment.razorpay_payment_id = razorpay_payment_id
  await order.save()

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    order,
  })
})

// Add address -- /create-address
const addAddress = asyncError(async (req, res, next) => {
  const { fullName, address, city, pincode, country, district, phone, house_no } = req.body
  const newAddress = await AddressModel.create({
    house_no,
    user_id: req.user._id.toString(),
    fullName,
    address,
    city,
    pincode,
    country,
    district,
    phone,
  })
  if (!newAddress) return next(new ValidationError("Address creation failed"))

  res.status(200).json({
    success: true,
    message: "Address has been created",
    address: newAddress,
  })
})

// Get addresses -- /get-address
const getAddress = asyncError(async (req, res, next) => {
  const { _id } = req.user
  const addresses = await AddressModel.find({ user_id: _id.toString() })
  if (!addresses || addresses.length < 1) return next(new ValidationError("Address Not found"))

  res.status(200).json({
    addresses,
  })
})

module.exports = {
  createOrder,
  verifyPayment,
  addAddress,
  getAddress,
}
