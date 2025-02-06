import axios from "axios"

const api = axios.create({
    baseURL: "http://NEXT_APP_URL/api",
    withCredentials: true
})

export default api
