const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required!"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required!"],
  },
  stock: {
    type: Number,
    default: 1,
  },
  image_url: {
    type: String,
    required: [true, "Product image url is required!"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Provide products category"],
  },
  reviews:[{
    review:{
      type:String,
      required:true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'user'
    }
  }]
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = ProductModel
