const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDb = async () => {
  const dbUrl = process.env.DB_URL
  if (!dbUrl) {
    throw new Error("DB_URL environment variable is not defined")
  }
  try {
    await mongoose.connect(dbUrl)
    console.log("DB connected successfully")
  } catch (e) {
    console.log("Error connecting to DB: ", e)
    process.exit(1)
  }
}

module.exports = connectDb
