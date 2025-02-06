import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_APP_URL + "/api",
    withCredentials: true
})

export default api