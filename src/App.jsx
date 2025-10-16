import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm.jsx";
import "./style.css";

export default function App() {
  const [statusMessage, setStatusMessage] = useState("");

  // ✅ Detecta parámetros de estado (status=success|failure|pending)
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const status = qp.get("status");

    if (status) {
      let message = "";
      switch (status) {
        case "success":
          message = "✅ ¡Tu pago fue procesado correctamente!";
          break;
        case "failure":
          message = "❌ El pago fue cancelado o rechazado.";
          break;
        case "pending":
          message = "⌛ Tu pago está pendiente de confirmación.";
          break;
        default:
          message = "";
      }

      if (message) setStatusMessage(message);

      // Limpia el query param (opcional)
      qp.delete("status");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "2rem",
      }}
    >
      {/* ✅ Mensaje superior (opcional) */}
      {statusMessage && (
        <div
          style={{
            backgroundColor:
              statusMessage.includes("✅")
                ? "#2ecc71"
                : statusMessage.includes("❌")
                ? "#e74c3c"
                : "#f39c12",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: 600,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          {statusMessage}
        </div>
      )}

      <UploadForm />
    </div>
  );
}
