class AuthHelper {
  constructor() {}

  sendCookie = async (res, user) => {
    const token = user.getJwtToken()

    const options = {
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    }

    const { password, ...rest } = user.toObject()
    res.cookie("homes_auth", token, options).json({
      success: true,
      message: "User has been created.",
      user: rest,
    })
  }
}

module.exports = AuthHelper