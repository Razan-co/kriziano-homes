// controllers/orderController.js
const asyncError = require("../middlewares/asyncError")
const Razorpay = require("razorpay")
const crypto = require("crypto")
const { AddressModel } = require("../models/model")
const { AuthError, NotFoundError, ValidationError } = require("../utils/ErrorHandler")
const Order = require("../models/orderModel")
const ProductModel = require("../models/productModel")



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
});

/**
 * Create a new order
 * Route: POST /order/create-order
 */
const createOrder = asyncError(async (req, res, next) => {
  const { products, address: addressId } = req.body
  const userId = req.user._id

  // Validate inputs
  if (!products?.length) return next(new ValidationError("No products provided"))
  if (!addressId) return next(new ValidationError("Shipping address is required"))

  // Fetch and validate address
  const address = await AddressModel.findById(addressId)
  if (!address) return next(new NotFoundError("Shipping address not found"))

  // Fetch products and calculate total amount
  const productDocs = await Promise.all(
    products.map((item) => ProductModel.findById(item.productId))
  )

  let totalAmount = 0
  const orderItems = []

  for (let i = 0; i < productDocs.length; i++) {
    const product = productDocs[i]
    const item = products[i]

    if (!product)
      return next(new NotFoundError(`Product not found: ${item.productId}`))

    const subTotal = product.price * item.quantity
    totalAmount += subTotal

    orderItems.push({
      product: product._id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      subTotal,
    })
  }

  // Create Razorpay order (in paise)
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(totalAmount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  })

  // Save order in MongoDB
  const order = await Order.create({
    user: userId,
    items: orderItems,
    total: totalAmount,
    shippingAddress: address._id,
    payment: {
      method: "razorpay",
      status: "created",
      razorpay_order_id: razorpayOrder.id,
    },
    status: "pending",
  })

  if (!order) return next(new NotFoundError("Order creation failed"))

  console.log("✅ Razorpay order created:", razorpayOrder.id)

  // Respond with order details and razorpay info
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    orderId: order._id,
    razorpay_order_id: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    key: process.env.RAZORPAY_KEY_ID,
  })
})

/**
 * Verify Razorpay Payment
 * Route: POST /order/verify-payment
 */
const verifyPayment = asyncError(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return next(new ValidationError("Missing required payment fields"));

  // 🧩 Corrected query syntax
  const order = await Order.findOne({ "payment.razorpay_order_id": razorpay_order_id });
  if (!order) return next(new NotFoundError("Order not found"));

  // Prevent re-verification
  if (order.payment.status === "paid") {
    return res.status(200).json({
      success: true,
      message: "Payment already verified",
      order,
    });
  }

  // ✅ Generate and verify signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature)
    return next(new ValidationError("Payment verification failed"));

  // ✅ Update order on successful verification
  order.status = "confirmed";
  order.payment = {
    ...order.payment,
    razorpay_payment_id,
    razorpay_signature,
    status: "paid",
    verifiedAt: new Date(),
  };

  await order.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    order,
  });
});

/**
 * 🏠 Add new address
 * Route: POST /create-address
 */
const addAddress = asyncError(async (req, res, next) => {
  const { fullName, address, city, pincode, country, district, phone, house_no } = req.body

  if (!fullName || !address || !city || !pincode || !phone)
    return next(new ValidationError("All required address fields must be provided"))

  const newAddress = await AddressModel.create({
    user_id: req.user._id,
    house_no,
    fullName,
    address,
    city,
    pincode,
    country,
    district,
    phone,
  })

  res.status(200).json({
    success: true,
    message: "Address created successfully",
    address: newAddress,
  })
})

/**
 * 📦 Get user addresses
 * Route: GET /get-address
 */
const getAddress = asyncError(async (req, res, next) => {
  const addresses = await AddressModel.find({ user_id: req.user._id })
  if (!addresses || addresses.length === 0)
    return next(new NotFoundError("No address found"))

  res.status(200).json({
    success: true,
    addresses,
  })
})

/**
 * Get user orders
 * Route: GET /order/get-orders?status=pending
 */
const getOrders = asyncError(async (req, res, next) => {
  const userId = req.user._id;
  const statusFilter = req.query.status;
  // Build query object filtering by user and optionally status
  const query = { user: userId };
  if (statusFilter) query.status = statusFilter;

  const orders = await Order.find(query).sort({ createdAt: -1 });

  if (!orders)
    return next(new NotFoundError("No orders found"));

  if (orders.length === 0)
    return res.status(201).json({
      success: true,
      message: "No orders found"
    })

  return res.status(200).json({
    success: true,
    orders,
  })
})


module.exports = {
  createOrder,
  verifyPayment,
  addAddress,
  getAddress, getOrders
}
