import React from "react";
import UploadForm from "./components/UploadForm";

export default function App() {
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
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#222", marginBottom: "0.5rem" }}>
        Magnético Fotoimanes
      </h1>
      <p style={{ color: "#555", marginBottom: "1rem" }}>
        Subí tus fotos y completá tu pedido en segundos
      </p>
      <UploadForm />
    </div>
  );
}
