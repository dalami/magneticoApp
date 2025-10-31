// App.jsx - VERSIÓN COMPLETA CON TODOS LOS IMPORTS
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import UploadForm from "./components/UploadForm.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Precios from "./pages/Precios.jsx";
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import "./style.css";
import "./App.css";

// 🎯 Componente para tracking de analytics
function RouteTracker() {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    console.log(`📍 Navegación: ${location.pathname}${location.search}`);
  }, [location]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null;
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
          ? { backgroundColor: "#4CAF50", color: "white" }
          : { backgroundColor: "#F44336", color: "white" }),
      }}
    >
      {isOnline ? "✅ Conexión restaurada" : "🌐 Sin conexión a internet"}
    </div>
  );
}

// 🎯 Componente de layout principal
function AppLayout({ children }) {
  return (
    <div className="app">
      <ConnectionStatus />
      {children}
    </div>
  );
}

// 🚀 Componente wrapper para Landing con navegación
function LandingWithNavigation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🔄 EFECTO PARA REDIRIGIR DESDE PAGOS
  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const orderId = searchParams.get("order");
    const amount = searchParams.get("amount");

    if (paymentStatus === "success" && orderId) {
      console.log("🔄 Redirigiendo a success page");
      sessionStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          orderId,
          status: "approved",
          amount,
          timestamp: new Date().toISOString(),
        })
      );
      setTimeout(() => {
        navigate(
          `/success?order=${orderId}&from_redirect=true&amount=${amount}`
        );
      }, 500);
    } else if (
      (paymentStatus === "error" || paymentStatus === "failure") &&
      orderId
    ) {
      console.log("❌ Redirigiendo a error page");
      sessionStorage.setItem(
        "failedOrder",
        JSON.stringify({
          orderId,
          status: "failed",
          amount,
          timestamp: new Date().toISOString(),
        })
      );
      setTimeout(() => {
        navigate(`/error?order=${orderId}&from_redirect=true&status=failed`);
      }, 500);
    }
  }, [searchParams, navigate]);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigate("/crear-fotoimanes");
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Landing onCtaClick={handleCtaClick} onSmoothScroll={handleSmoothScroll} />
  );
}

// 🎯 Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 Error capturado:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "#C0392B", marginBottom: "1rem" }}>
            ⚠️ Algo salió mal
          </h1>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            Por favor, recargá la página.
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
        </div>
      );
    }
    return this.props.children;
  }
}

// 🚀 Componente principal
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RouteTracker />
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingWithNavigation />} />
            <Route path="/crear-fotoimanes" element={<UploadForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/terminos-condiciones"element={<TermsAndConditions />}/>
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
            <Route path="/politica-envios" element={<ShippingPolicy />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
