const asyncError = require("../middlewares/asyncError");
const Notification=require("../models/notificationModel");


const getNotification=asyncError(async(req,res,next)=>{
  const notifications=await Notification.find({user_id:req.user._id,isRead:false}).sort({createdAt:-1});    
  //isread=false
    res.status(200).json({
        success:true,
        notifications
    })
})

const markAsRead=asyncError(async(req,res,next)=>{
    const {notification_id}=req.params;
    await Notification.findByIdAndUpdate(notification_id,{isRead:true});
    res.status(200).json({
        success:true,
        message:"Notification marked as read"
    })
})

const deleteNotification=asyncError(async(req,res,next)=>{
    await Notification.findByIdAndDelete(req.params.notification_id);
    res.status(200).json({
        success:true,
        message:"Notification deleted"
    })
})

module.exports={
    getNotification,
    markAsRead,
    deleteNotification
}
