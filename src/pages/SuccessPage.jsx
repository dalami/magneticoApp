import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "/magnetocp.jpg";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [countdown, setCountdown] = useState(8);

  // 🔍 Obtener detalles del pedido desde URL parameters
  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');
    
    setOrderDetails({
      paymentId: paymentId || '--',
      status: status || 'approved',
      orderId: externalReference || `ORD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('es-AR')
    });

    // Auto-redirección después de 8 segundos
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
  }, [searchParams, navigate]);

  // 📧 Simular envío de email de confirmación
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("📧 Email de confirmación enviado al cliente");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 🎯 Datos del pedido (simulados - en producción vendrían de la API)
  const orderSummary = {
    estimatedDelivery: "3-5 días hábiles",
    nextSteps: [
      "Recibirás un email con los detalles de tu pedido",
      "Te contactaremos para coordinar el envío",
      "Preparamos tus fotoimanes con cuidado"
    ],
    contactEmail: "diegoalami@gmail.com",
    supportHours: "Lunes a Viernes de 9:00 a 18:00"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
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
        background: "rgba(46, 125, 50, 0.1)",
        padding: "8px 12px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        color: "#2E7D32",
        fontWeight: "500",
      }}>
        ⏳ Volviendo al inicio en {countdown}s
      </div>

      {/* 🎉 Animación de confeti visual */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "8rem",
        opacity: "0.1",
        zIndex: "0",
        animation: "pulse 2s infinite"
      }}>
        🎉
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.15; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes checkmark {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <img
        src={logo}
        alt="Magnético Fotoimanes"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          zIndex: "1",
          position: "relative",
        }}
      />

      {/* ✅ Icono de éxito animado */}
      <div style={{
        fontSize: "4rem",
        marginBottom: "20px",
        animation: "checkmark 0.6s ease-out",
        zIndex: "1",
        position: "relative",
      }}>
        ✅
      </div>

      <h1
        style={{
          color: "#2E7D32",
          fontSize: "2.2rem",
          fontWeight: "700",
          marginBottom: "15px",
          lineHeight: "1.3",
          zIndex: "1",
          position: "relative",
        }}
      >
        ¡Pago Exitoso!
      </h1>

      <p
        style={{
          color: "#4A3B2F",
          fontSize: "1.1rem",
          maxWidth: "400px",
          lineHeight: "1.6",
          marginBottom: "10px",
          fontWeight: "500",
          zIndex: "1",
          position: "relative",
        }}
      >
        Gracias por tu compra 💛
      </p>

      <p
        style={{
          color: "#666",
          fontSize: "0.95rem",
          maxWidth: "400px",
          lineHeight: "1.5",
          marginBottom: "30px",
          zIndex: "1",
          position: "relative",
        }}
      >
        Tu pedido ha sido confirmado y estamos procesándolo.
      </p>

      {/* 📦 Resumen del pedido */}
      <div style={{
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "25px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        zIndex: "1",
        position: "relative",
      }}>
        <h3 style={{
          color: "#2E7D32",
          fontSize: "1.1rem",
          fontWeight: "600",
          marginBottom: "15px",
        }}>
          📦 Resumen de tu pedido
        </h3>

        {orderDetails && (
          <div style={{
            textAlign: "left",
            fontSize: "0.9rem",
            color: "#555",
            lineHeight: "1.6",
          }}>
            <p><strong>ID de Pedido:</strong> {orderDetails.orderId}</p>
            <p><strong>Estado:</strong> <span style={{color: "#2E7D32", fontWeight: "600"}}>Confirmado ✅</span></p>
            <p><strong>Fecha:</strong> {orderDetails.timestamp}</p>
            <p><strong>Entrega estimada:</strong> {orderSummary.estimatedDelivery}</p>
          </div>
        )}

        {/* 🚀 Próximos pasos */}
        <div style={{ marginTop: "15px" }}>
          <h4 style={{
            color: "#4A3B2F",
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "10px",
          }}>
            🚀 Próximos pasos:
          </h4>
          <ul style={{
            textAlign: "left",
            paddingLeft: "20px",
            color: "#666",
            fontSize: "0.85rem",
            lineHeight: "1.5",
          }}>
            {orderSummary.nextSteps.map((step, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🎯 Acciones */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: "300px",
        zIndex: "1",
        position: "relative",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#2E7D32",
            color: "#fff",
            border: "none",
            padding: "14px 24px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(46, 125, 50, 0.3)",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1B5E20";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(46, 125, 50, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#2E7D32";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(46, 125, 50, 0.3)";
          }}
        >
          🏠 Volver al inicio
        </button>

        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: "transparent",
            color: "#2E7D32",
            border: "2px solid #2E7D32",
            padding: "12px 24px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(46, 125, 50, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          🖨️ Imprimir comprobante
        </button>
      </div>

      {/* 📞 Información de contacto */}
      <div style={{
        marginTop: "30px",
        padding: "15px",
        background: "rgba(255, 255, 255, 0.6)",
        borderRadius: "10px",
        maxWidth: "400px",
        width: "100%",
        zIndex: "1",
        position: "relative",
      }}>
        <p style={{
          fontSize: "0.85rem",
          color: "#666",
          lineHeight: "1.4",
          margin: "0",
        }}>
          <strong>¿Preguntas?</strong> Contactanos: {orderSummary.contactEmail}<br />
          Horario: {orderSummary.supportHours}
        </p>
      </div>

      {/* 🛡️ Mensaje de seguridad */}
      <p style={{
        marginTop: "20px",
        fontSize: "0.8rem",
        color: "#888",
        maxWidth: "400px",
        lineHeight: "1.4",
        zIndex: "1",
        position: "relative",
      }}>
        🔒 Tu compra está protegida. Recibirás un email de confirmación.
      </p>
    </div>
  );
}