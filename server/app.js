import { config } from "dotenv"
import "express-async-errors"
config()

// express
import express, { json, urlencoded } from "express"
const app = express()

// rest of packages
import morgan from "morgan"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import cors from "cors"
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

// DB
import connectDB from "./db/connect.js"

// routers
import authRouter from "./routes/auth.js"

// middleware
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("tiny"))
app.use(helmet())
app.use(cors({
    origin: "https://mern-auth-opal.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(cookieParser())

// routes
app.use("/api/v1/auth", authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(4000, () => {
            console.log(`Listening on port 4000...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()