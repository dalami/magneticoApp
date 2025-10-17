import axios from "axios";

// 🚀 Forzar backend en Render para producción
const API_URL = "https://magnetico-server-1.onrender.com";

console.log("🌐 API URL activa:", API_URL);

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
});
