import axios from "axios"

const baseUrl = "https://mern-auth-bd2n.vercel.app/api/v1"

const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

export default instance