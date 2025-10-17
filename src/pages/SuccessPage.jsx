import React from "react";

export default function SuccessPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#F7F5F0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "#27ae60" }}>✅ ¡Pago exitoso!</h1>
      <p style={{ marginTop: "10px", color: "#444" }}>
        Recibirás un correo con los detalles de tu pedido.
      </p>
    </div>
  );
}
