import React, { useState } from "react";
import axios from "axios";
import logo from "/magnetocp.jpg";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const PRODUCT_PRICE = Number(import.meta.env.VITE_DEFAULT_PRICE) || 2000;
  const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/,"");

  const handleFiles = (e) => setFiles(Array.from(e.target.files || []));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length || !email) return alert("Completá todos los campos.");

    try {
      setLoading(true);
      setMessage("🔄 Conectando con Mercado Pago...");

      const { data } = await axios.post(`${API_URL}/api/pay`, {
        name,
        email,
        price: PRODUCT_PRICE,
      });

      if (data?.init_point) {
        window.location.href = data.init_point;
      } else if (data?.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        throw new Error("Respuesta inválida del servidor.");
      }
    } catch (error) {
      console.error("❌ Error:", error?.response?.data || error.message);
      setMessage("❌ No se pudo iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        <img src={logo} alt="Magnético" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>

      <h2 style={{ margin: 0 }}>Magnético Fotoimanes</h2>
      <p style={{ marginTop: 6 }}>Subí tus fotos (78×53 mm) y completá tu pedido</p>

      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
      />

      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        required
      />

      <input type="file" multiple accept="image/*" onChange={handleFiles} style={{ marginBottom: 12, width: "100%" }} />

      {files.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {files.map((file, i) => (
              <div key={i}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`foto-${i}`}
                  style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }}
                />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#555", marginTop: -4 }}>
            {files.length} foto{files.length > 1 ? "s" : ""} seleccionada{files.length > 1 ? "s" : ""}.
          </p>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#D3C7B4",
          color: "#000",
          border: "none",
          padding: "10px 20px",
          borderRadius: 8,
          width: "100%",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Conectando con Mercado Pago..." : "Ir al Pago"}
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </form>
  );
}
