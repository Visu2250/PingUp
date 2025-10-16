import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:4000", // ✅ backend base URL
  withCredentials: true,
});

export default api;


