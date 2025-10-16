import React from "react";

export default function ErrorPage() {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "3rem",
        color: "#333",
      }}
    >
      <img
        src="/logo.png"
        alt="Magnético"
        style={{ width: 120, marginBottom: 20 }}
      />
      <h1 style={{ color: "#e11d48" }}>❌ Hubo un error con el pago</h1>
      <p style={{ marginTop: 10 }}>
        No pudimos procesar tu pago o fue cancelado.  
        Por favor, intentá nuevamente o contactanos.
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: 30,
          background: "#e11d48",
          color: "#fff",
          textDecoration: "none",
          padding: "12px 25px",
          borderRadius: 8,
          fontWeight: 600,
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#be123c")}
        onMouseOut={(e) => (e.target.style.background = "#e11d48")}
      >
        Volver a la tienda
      </a>
    </div>
  );
}
