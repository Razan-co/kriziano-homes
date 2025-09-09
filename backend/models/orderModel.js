const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
)

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String,
      method: String,
      paidAt: Date,
    },
  },
  { timestamps: true }
)

const Order = mongoose.model("order", orderSchema)

module.exports = Order
