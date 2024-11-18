import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Create an axios instance with the base URL configured
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
