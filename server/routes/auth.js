import { Router } from "express"
import { authentiateUser } from "../middleware/authentication.js"
import { register,login,logout } from "../controllers/auth.js"

const authRouter = Router()

authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/logout").get(authentiateUser, logout)

export default authRouter