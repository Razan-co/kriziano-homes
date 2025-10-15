const express = require("express");
const {
  addAddress,
  createOrder,
  getAddress,
  verifyPayment,
  getOrders,  
} = require("../controllers/orderController");
const isAuthenticate = require("../middlewares/isAuthenticate");
const isAuthourized = require("../middlewares/permissionMiddleware");

const route = express.Router();

route.post("/create-address", isAuthenticate, isAuthourized("user"), addAddress);
route.get("/get-address", isAuthenticate, isAuthourized("user"), getAddress);
route.post("/create-order", isAuthenticate, isAuthourized("user"), createOrder);
route.post("/verify-payment", isAuthenticate, isAuthourized("user"), verifyPayment);
route.get("/get-orders", isAuthenticate, isAuthourized("user"), getOrders);

module.exports = route;
