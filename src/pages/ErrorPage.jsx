import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/magnetocp.jpg";

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorType, setErrorType] = useState("payment");
  const [countdown, setCountdown] = useState(5);

  // 🔍 Detectar tipo de error basado en la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type') || 'payment';
    setErrorType(type);
    
    // Auto-redirección después de 5 segundos
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location, navigate]);

  // 🎯 Configuración de mensajes por tipo de error
  const errorConfig = {
    payment: {
      title: "❌ Ocurrió un error con tu pago",
      message: "No te preocupes, puede haber sido un problema momentáneo. Si el error persiste, podés contactarnos o intentar nuevamente.",
      buttonText: "🔁 Intentar el pago nuevamente",
      icon: "💳"
    },
    network: {
      title: "🌐 Problema de conexión",
      message: "No pudimos conectarnos con el servidor. Verificá tu conexión a internet e intentá nuevamente.",
      buttonText: "🔄 Reintentar conexión",
      icon: "📡"
    },
    photos: {
      title: "📸 Error al procesar fotos",
      message: "Hubo un problema al procesar tus fotos. Asegurate de que sean imágenes válidas y no muy pesadas.",
      buttonText: "📤 Volver a subir fotos",
      icon: "🖼️"
    },
    general: {
      title: "⚠️ Algo salió mal",
      message: "Ocurrió un error inesperado. No te preocupes, tu información está segura. Podés intentar nuevamente.",
      buttonText: "🔄 Intentar nuevamente",
      icon: "⚡"
    },
    cancelled: {
      title: "⏹️ Pago cancelado",
      message: "Cancelaste el proceso de pago. Cuando estés listo, podés intentarlo nuevamente.",
      buttonText: "💳 Reanudar pago",
      icon: "🛑"
    }
  };

  const config = errorConfig[errorType] || errorConfig.general;

  // 📞 Información de contacto
  const contactInfo = {
    email: "diegoalami@gmail.com",
    whatsapp: "+5491112345678",
    businessHours: "Lunes a Viernes de 9:00 a 18:00"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #F9F6F1 0%, #E8DFD2 100%)",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* 🔄 Indicador de auto-redirección */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "rgba(188, 168, 143, 0.1)",
        padding: "8px 12px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        color: "#4A3B2F",
        fontWeight: "500",
      }}>
        ⏳ Redirigiendo en {countdown}s
      </div>

      <img
        src={logo}
        alt="Magnético Fotoimanes"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      />

      <div style={{
        fontSize: "4rem",
        marginBottom: "15px",
        lineHeight: "1"
      }}>
        {config.icon}
      </div>

      <h1
        style={{
          color: "#C0392B",
          fontSize: "1.8rem",
          fontWeight: "700",
          marginBottom: "15px",
          lineHeight: "1.3",
        }}
      >
        {config.title}
      </h1>

      <p
        style={{
          color: "#4A3B2F",
          fontSize: "1rem",
          maxWidth: "400px",
          lineHeight: "1.6",
          marginBottom: "30px",
        }}
      >
        {config.message}
      </p>

      {/* 🎯 Acciones principales */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        maxWidth: "300px",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#BCA88F",
            color: "#fff",
            border: "none",
            padding: "14px 24px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(188, 168, 143, 0.3)",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#A8927A";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(188, 168, 143, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#BCA88F";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(188, 168, 143, 0.3)";
          }}
        >
          {config.buttonText}
        </button>

        <button
          onClick={() => window.history.back()}
          style={{
            backgroundColor: "transparent",
            color: "#4A3B2F",
            border: "2px solid #BCA88F",
            padding: "12px 24px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(188, 168, 143, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          ↩️ Volver atrás
        </button>
      </div>

      {/* 📞 Información de contacto */}
      <div style={{
        marginTop: "40px",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: "12px",
        maxWidth: "400px",
        width: "100%",
      }}>
        <h3 style={{
          color: "#4A3B2F",
          fontSize: "1rem",
          fontWeight: "600",
          marginBottom: "15px",
        }}>
          📞 ¿Necesitás ayuda?
        </h3>
        
        <div style={{
          fontSize: "0.9rem",
          color: "#666",
          lineHeight: "1.5",
        }}>
          <p>✉️ Email: {contactInfo.email}</p>
          <p>📱 WhatsApp: {contactInfo.whatsapp}</p>
          <p>🕒 Horario: {contactInfo.businessHours}</p>
        </div>
      </div>

      {/* 🛡️ Mensaje de seguridad */}
      <p style={{
        marginTop: "20px",
        fontSize: "0.8rem",
        color: "#888",
        maxWidth: "400px",
        lineHeight: "1.4",
      }}>
        🔒 Tu información está segura. No almacenamos datos de pago sensibles.
      </p>
    </div>
  );
}