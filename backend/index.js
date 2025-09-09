const express = require("express")
const dotenv = require("dotenv")
const connectDb = require("./config/db/connectDb")
const errorMiddleware = require("./middlewares/errorMiddleware")
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const orderRoute = require("./routes/orderRoute")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

dotenv.config()
connectDb()

const app = express()

// Middlewares
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

// API routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/order", orderRoute)



if (process.env.NODE_ENV === 'production') {
  // Construct the path to the frontend build directory
  const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, 'index.html'));
  });
}

app.use(errorMiddleware)

const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log(path.join(path.resolve(),'frontend'))
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(process.env.NODE_ENV)
})
