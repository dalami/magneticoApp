// src/Lib/api.js - VERSIÓN CORREGIDA
import axios from "axios";

// 🌍 Configuración de entornos - FALLBACK FORZADO
const ENV_CONFIG = {
  development: {
    apiUrl: "http://localhost:5000",
    logLevel: "debug"
  },
  production: {
    // 🔥 FALLBACK FORZADO - IGNORAR VARIABLES DE ENTORNO TEMPORALMENTE
    apiUrl: "https://magnetico-server-1.onrender.com", 
    logLevel: "error"
  }
};

// 🔹 Detectar entorno SIMPLIFICADO Y SEGURO
const getEnvironment = () => {
  const hostname = window.location.hostname;
  
  // Si estamos en localhost, usar desarrollo
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "development";
  }
  
  // CUALQUIER OTRO CASO → PRODUCCIÓN
  return "production";
};

const currentEnv = getEnvironment();
const config = ENV_CONFIG[currentEnv];

// 🚀 DEBUG: Logs detallados para diagnóstico
console.log(`🌐 Entorno detectado: ${currentEnv}`);
console.log(`🔗 API URL configurada: ${config.apiUrl}`);
console.log(`📦 VITE_API_URL:`, import.meta.env.VITE_API_URL);
console.log(`🏠 Hostname actual:`, window.location.hostname);
console.log(`🔍 URL final de API: ${config.apiUrl}/api`);

// 🚀 Crear instancia de axios CON URL FIJA TEMPORAL
export const api = axios.create({
  baseURL: "https://magnetico-server-1.onrender.com/api", // 🔥 URL FIJA
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📊 Interceptor de requests para logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
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
    console.log(`✅ [API] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ [API] Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// 🔧 Funciones utilitarias
export const ApiUtils = {
  async healthCheck() {
    try {
      const response = await api.get("/health");
      return { healthy: true, data: response.data };
    } catch (error) {
      return { healthy: false, error: error.message };
    }
  },
  
  async checkPricing() {
    try {
      const response = await api.get("/config/price");
      return {
        available: true,
        price: response.data.unit_price || response.data.price,
        rawData: response.data
      };
    } catch (error) {
      console.error('❌ Error obteniendo precio:', error);
      return { available: false, error: error.message };
    }
  }
};

export default api;