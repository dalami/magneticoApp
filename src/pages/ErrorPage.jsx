import React from "react";

export default function ErrorPage() {
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
      <h1 style={{ color: "#e74c3c" }}>❌ Ocurrió un error con tu pago</h1>
      <p style={{ marginTop: "10px", color: "#555" }}>
        Si el problema persiste, podés contactarnos para asistencia.
      </p>
    </div>
  );
}
