require("dotenv").config()
require("express-async-errors")
// express
const express = require("express")
const app = express()

// rest of packages
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const cors = require("cors")
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// DB
const connectDB = require("./db/connect")

// routers

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(helmet())
app.use(cors())
app.use(cookieParser())



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async() => {
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(4000, () => {
            console.log(`Listening on port 4000...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()