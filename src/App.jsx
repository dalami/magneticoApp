// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Landing from "./pages/Landing.jsx"
import UploadForm from "./components/UploadForm.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { ApiUtils } from "./Lib/api.js";
import "./style.css";
import "./App.css"

// 🎯 Componente para tracking de analytics y manejo de errores global
function RouteTracker() {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 📊 Tracking de página (simplificado para desarrollo)
  useEffect(() => {
    console.log(`📍 Navegación: ${location.pathname}${location.search}`);

    // En producción, aquí iría Google Analytics o similar
    if (process.env.NODE_ENV === "production") {
      // window.gtag('config', 'GA_MEASUREMENT_ID', { page_path: location.pathname });
    }
  }, [location]);

  // 🌐 Monitoreo de conexión
  useEffect(() => {
    const handleOnline = () => {
      console.log("✅ Conexión restaurada");
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.warn("🌐 Sin conexión a internet");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // 🩺 Health check del servidor al cargar la app
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const health = await ApiUtils.healthCheck();
        if (!health.healthy) {
          console.warn("⚠️ Servidor no responde correctamente");
        } else {
          console.log("✅ Servidor funcionando correctamente");
        }
      } catch (error) {
        console.error("❌ Error en health check:", error);
      }
    };

    // Esperar un poco antes del health check
    const timer = setTimeout(checkServerHealth, 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

// 🎯 Componente de layout principal
function AppLayout({ children }) {
  return (
    <div className="app">
      {/* 🔔 Notificación de estado de conexión */}
      <ConnectionStatus />
      {children}
    </div>
  );
}

// 🌐 Componente para mostrar estado de conexión
function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 20px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        zIndex: 10000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        animation: "slideIn 0.3s ease-out",
        ...(isOnline
          ? {
              backgroundColor: "#4CAF50",
              color: "white",
            }
          : {
              backgroundColor: "#F44336",
              color: "white",
            }),
      }}
    >
      {isOnline ? "✅ Conexión restaurada" : "🌐 Sin conexión a internet"}
    </div>
  );
}

// 🎯 Error Boundary para capturar errores globales
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 Error capturado por Error Boundary:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // En producción, enviar a servicio de logging
    if (process.env.NODE_ENV === "production") {
      // servicioLogging.logError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <h1 style={{ color: "#C0392B", marginBottom: "1rem" }}>
            ⚠️ Algo salió mal
          </h1>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            Ocurrió un error inesperado. Por favor, recargá la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#BCA88F",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🔄 Recargar página
          </button>

          {process.env.NODE_ENV === "development" && (
            <details
              style={{
                marginTop: "2rem",
                textAlign: "left",
                maxWidth: "600px",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              <summary>Detalles del error (desarrollo)</summary>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "1rem",
                  borderRadius: "4px",
                  overflow: "auto",
                  marginTop: "1rem",
                }}
              >
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// 🚀 Componente principal de la aplicación
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* 📊 Componente para tracking y monitoreo */}
        <RouteTracker />

        <AppLayout>
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* Página principal - Formulario de subida */}
            <Route path="/" element={<UploadForm />} />

            {/* Página de éxito después del pago */}
            <Route path="/success" element={<SuccessPage />} />

            {/* Página de error o cancelación */}
            <Route path="/error" element={<ErrorPage />} />

            {/* Página de pending (opcional) */}
            <Route
              path="/pending"
              element={
                <div
                  style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <h1 style={{ color: "#FF9800", marginBottom: "1rem" }}>
                    ⏳ Pago en proceso
                  </h1>
                  <p style={{ color: "#666", marginBottom: "2rem" }}>
                    Estamos procesando tu pago. Te notificaremos cuando se
                    complete.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/")}
                    style={{
                      backgroundColor: "#BCA88F",
                      color: "white",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    🏠 Volver al inicio
                  </button>
                </div>
              }
            />

            {/* Redirección para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

// 📝 Estilos CSS adicionales para las animaciones
const additionalStyles = `
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.app {
  min-height: 100vh;
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mejoras de focus para accesibilidad */
button:focus-visible {
  outline: 2px solid #BCA88F;
  outline-offset: 2px;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}
`;

// 🎨 Inyectar estilos adicionales
const styleSheet = document.createElement("style");
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);
