// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });

// // Add token to requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Login
// export const loginAdmin = (email, password) =>
//   API.post("/auth/login", { email, password });

// // 👇 FIX: also export API as default
// export default API;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // set this after login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
