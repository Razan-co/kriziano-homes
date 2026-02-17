const asyncError = require("../middlewares/asyncError")


export const addReview = asyncError(async (req, res, next) => {

    //product id, review, userid
    const userId=req.user.id.toString();
    const productId=req.params.productId;
    const review=req.body.review;

    const usersOrder=7;

  // const addresses = await AddressModel.find({ user_id: req.user._id })
  // if (!addresses || addresses.length === 0)
  //   return next(new NotFoundError("No address found"))

  // res.status(200).json({
  //   success: true,
  //   addresses,
  // })
})