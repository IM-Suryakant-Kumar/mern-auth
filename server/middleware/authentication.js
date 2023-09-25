import User from "../models/User"
import jwt from "jsonwebtoken"
import { UnauthenticatedError, UnauthorizedError } from "../errors"

export const authentiateUser = async (req, res, next) => {
    const { token } = req.cookies

    if(!token) {
        throw new UnauthenticatedError("Authentication Invalid")
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(userId)
    next()
}

export const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req,user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route")
        }
        next()
    }
}