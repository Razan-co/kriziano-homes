const express = require("express")
const isAuthenticate = require("../middlewares/isAuthenticate")
const isAuthourized = require("../middlewares/permissionMiddleware");
const { getNotification, deleteNotification, markAsRead } = require("../controllers/notificationController");

const route = express.Router();

route.get("/get-notification",isAuthenticate,isAuthourized("user"),getNotification);
route.put("/mark-as-read/:notification_id",isAuthenticate,isAuthourized("user"),markAsRead);
route.delete("/delete-notification/:notification_id",isAuthenticate,isAuthourized("user"),deleteNotification);


module.exports = route;
