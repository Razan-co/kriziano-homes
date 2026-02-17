const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["order", "message", "system", "promotion"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

const Notification = mongoose.model("notification", notificationSchema)

module.exports = Notification
