// src/Lib/api.js
import axios from "axios";

// 🌍 Configuración de entornos
const ENV_CONFIG = {
  development: {
    apiUrl: "http://localhost:5000",
    logLevel: "debug"
  },
  production: {
    apiUrl: "https://magnetico-server-1.onrender.com", 
    logLevel: "error"
  }
};

// 🔹 Detectar entorno de forma más robusta
const getEnvironment = () => {
  const hostname = window.location.hostname;
  
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "development";
  }
  
  if (hostname.includes("vercel.app") || hostname.includes("magnetico-app")) {
    return "production";
  }
  
  // Por defecto, asumir producción para seguridad
  return "production";
};

const currentEnv = getEnvironment();
const config = ENV_CONFIG[currentEnv];

console.log(`🌐 Entorno: ${currentEnv}`);
console.log(`🔗 API URL: ${config.apiUrl}`);

// 🚀 Crear instancia de axios con configuración optimizada
export const api = axios.create({
  baseURL: `${config.apiUrl}/api`,
  timeout: 30000, // 30 segundos timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// 📊 Interceptor de requests para logging
api.interceptors.request.use(
  (config) => {
    if (currentEnv === "development") {
      console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params
      });
    }
    
    // Agregar timestamp para evitar cache
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    return config;
  },
  (error) => {
    console.error("❌ [API] Error en request:", error);
    return Promise.reject(error);
  }
);

// 📊 Interceptor de responses para manejo centralizado de errores
api.interceptors.response.use(
  (response) => {
    if (currentEnv === "development") {
      console.log(`✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    const errorInfo = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      timestamp: new Date().toISOString()
    };

    console.error("❌ [API] Error en response:", errorInfo);

    // Manejo específico por tipo de error
    if (error.response) {
      // El servidor respondió con un código de error
      switch (error.response.status) {
        case 401:
          console.warn("🔐 No autorizado - Verificar autenticación");
          break;
        case 403:
          console.warn("🚫 Acceso prohibido");
          break;
        case 404:
          console.warn("🔍 Recurso no encontrado");
          break;
        case 413:
          console.warn("📸 Archivos demasiado grandes");
          break;
        case 429:
          console.warn("🚫 Demasiadas solicitudes - Rate limit");
          break;
        case 500:
          console.warn("⚡ Error interno del servidor");
          break;
        case 502:
        case 503:
        case 504:
          console.warn("🌐 Problemas de conectividad con el servidor");
          break;
        default:
          console.warn(`❓ Error HTTP ${error.response.status}`);
      }
    } else if (error.request) {
      // La request fue hecha pero no se recibió respuesta
      console.warn("🌐 No se pudo conectar con el servidor");
      
      // Verificar si está offline
      if (!navigator.onLine) {
        console.warn("📡 Sin conexión a internet");
      }
    } else {
      // Algo pasó en la configuración de la request
      console.warn("⚙️ Error en configuración de la request");
    }

    return Promise.reject({
      ...error,
      apiError: true,
      userMessage: getErrorMessage(error),
      details: errorInfo
    });
  }
);

// 🎯 Función para obtener mensajes de error amigables para el usuario
function getErrorMessage(error) {
  if (!error.response && !navigator.onLine) {
    return "No hay conexión a internet. Verificá tu conexión.";
  }
  
  if (error.code === 'ECONNABORTED') {
    return "El servidor está tardando demasiado en responder. Intentá nuevamente.";
  }
  
  if (error.response?.status === 413) {
    return "Las fotos son demasiado grandes. Reducí el tamaño e intentá nuevamente.";
  }
  
  if (error.response?.status === 429) {
    return "Demasiadas solicitudes. Esperá unos minutos antes de intentar nuevamente.";
  }
  
  if (error.response?.status >= 500) {
    return "Error temporal del servidor. Intentá nuevamente en unos minutos.";
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  return "Error de conexión. Verificá tu internet e intentá nuevamente.";
}

// 🔧 Funciones utilitarias para la API
export const ApiUtils = {
  // Verificar salud del servidor
  async healthCheck() {
    try {
      const response = await api.get("/health");
      return {
        healthy: true,
        data: response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },
  
  // Verificar configuración de precios
  async checkPricing() {
    try {
      const response = await api.get("/config/price");
      return {
        available: true,
        price: response.data.price || response.data.unit_price,
        currency: response.data.currency_id
      };
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  },
  
  // Cancelar requests pendientes
  createCancelToken() {
    return axios.CancelToken.source();
  }
};

// 🛡️ Tipos de errores personalizados
export class ApiError extends Error {
  constructor(message, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// 📝 Exportar configuración para uso externo
export const API_CONFIG = {
  environment: currentEnv,
  baseURL: config.apiUrl,
  timeout: 30000,
  endpoints: {
    sendPhotos: "/send-photos",
    config: "/config",
    health: "/health"
  }
};

export default api;