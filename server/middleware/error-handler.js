import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err)
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again"
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware