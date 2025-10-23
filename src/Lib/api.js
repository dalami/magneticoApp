// src/Lib/api.js - VERSIÓN DEFINITIVA PARA PRODUCCIÓN
import axios from "axios";

// 🚀 Configuración para producción
const getBaseURL = () => {
  // En producción, siempre usar el servidor en Render
  return "https://magnetico-server-1.onrender.com/api";
};

// 🚀 Crear instancia de axios
export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 60000, // Aumentar timeout para producción
});

// 📊 Interceptor de requests
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error("❌ [API] Error en request:", error);
    return Promise.reject(error);
  }
);

// 📊 Interceptor de responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ [API] Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;