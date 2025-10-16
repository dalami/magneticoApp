// /src/lib/api.js
import axios from "axios";

// Detecta entorno automáticamente
const isLocal = window?.location?.hostname === "localhost";

// Usa variable de entorno si está definida, o fallback automático
const API_URL =
  (import.meta.env.VITE_API_URL?.replace(/\/+$/, "")) ||
  (isLocal
    ? "http://localhost:5000"
    : "https://magnetico-server-1.onrender.com");

// Log opcional (solo en desarrollo)
if (import.meta.env.DEV) console.log("🌍 API_URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ API error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);
