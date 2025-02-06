import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    withCredentials: true
})

export async function getCurrentUser(token: string) {
  try {
    const response = await api.get('/user/get-current', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export default api;