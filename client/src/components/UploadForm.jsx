import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/magnetocp.jpg";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message] = useState("");

  const handleFiles = (e) => setFiles(Array.from(e.target.files));

  // 🔹 PASO 1: Preparar pedido y redirigir al pago
  const handlePreparePayment = async (e) => {
    e.preventDefault();
    if (!files.length || !email) return alert("Completá todos los campos.");

    // Guardar pedido temporal en localStorage
    const data = { name, email };
    localStorage.setItem("pendingOrder", JSON.stringify(data));

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/pay", { name, email });
      window.location.href = res.data.url; // redirige al checkout
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar el pago.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePreparePayment}
      style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "360px",
        textAlign: "center",
        margin: "20px auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ width: "295px", height: "200px", margin: "0 auto 10px" }}>
        <img
          src={logo}
          alt="Logo Magnético"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <h2>Magnético Fotoimanes</h2>
      <p>Subí tus fotos (78×53 mm) y completá tu pedido</p>

      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
      />

      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "8px", padding: "8px" }}
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
        style={{ marginBottom: "12px" }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#D3C7B4",
          color: "#000",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        {loading ? "Conectando con Mercado Pago..." : "Ir al Pago"}
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </form>
  );
}
