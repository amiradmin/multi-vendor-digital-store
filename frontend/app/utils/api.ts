import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allow sending credentials with requests
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network or CORS errors
    if (!error.response) {
      console.error("Network Error: Unable to reach the server.");
    } else {
      console.error("API Error: ", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
