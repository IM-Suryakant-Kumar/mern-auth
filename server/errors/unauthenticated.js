import { StatusCodes } from "http-status-codes"
import CustomAPIError from "./custom-error"

export default class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}