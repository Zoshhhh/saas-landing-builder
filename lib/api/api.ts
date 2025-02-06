import axios from "axios"

const api = axios.create({
    baseURL: "http://quicklaun.ch/api",
    withCredentials: true
})

export default api 