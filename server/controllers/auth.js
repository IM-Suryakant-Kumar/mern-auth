import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"
import sendToken from "../utils/jwtToken.js"

// Register user
export const register = async (req, res) => {
    const { name, email, password } = req.body

    if(!(name && email && password)) {
        throw new BadRequestError("Please provide all the values")
    }

    const emailAlreadyExists = await User.findOne({ email })
    if(emailAlreadyExists) {
        throw new BadRequestError("Email is already exists")
    }

    const isFirstAccount = (await User.countDocuments()) === 0
    const role = isFirstAccount ? "admin" : "user"

    const user = await User.create({ name, email, password, role })

    sendToken(user, StatusCodes.CREATED, res)
}

// login User
export const login = async (req, res) => {
    const { email, password } = req.body

    if(!(email && password)) {
        throw new BadRequestError("Please provide all values")
    }

    const user = await User.findOne({ email })
    if(!user) {
        throw new UnauthenticatedError("Authentication Invalid!")
    }

    const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credential");
	}

    sendToken(user, StatusCodes.OK, res)
}

// logout User
export const logout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(StatusCodes.OK).json({ msg: "Logged out!" })
}