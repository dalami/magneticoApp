// src/Lib/api.js - VERSIÓN PARA DONWEB
import axios from "axios";

// 🚀 Configuración para DonWeb
const getBaseURL = () => {
  // En producción, usar el servidor en DonWeb
  if (typeof window !== 'undefined') {
    // En el cliente (frontend)
    return "https://magnetico-fotoimanes.com/api";
  } else {
    // En el servidor (si hay SSR)
    return "https://magnetico-fotoimanes.com/api";
  }
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