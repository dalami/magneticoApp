import React, { useState } from "react";
import axios from "axios";
import logo from "../../public/magnetocp.jpg";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const PRODUCT_PRICE = import.meta.env.VITE_DEFAULT_PRICE || 2000;

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length || !email) return alert("Completá todos los campos.");

    try {
      setLoading(true);
      setMessage("🔄 Conectando con Mercado Pago...");
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/pay`, {
        name,
        email,
        price: PRODUCT_PRICE,
      });
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${res.data.id}`;
    } catch (error) {
      console.error(error);
      setMessage("❌ No se pudo iniciar el pago.");
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
      {/* Logo */}
      <div style={{ width: "295px", height: "200px", margin: "0 auto 10px" }}>
        <img
          src={logo}
          alt="Magnético"
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
        style={{
          width: "100%",
          marginBottom: "8px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "8px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
        style={{ marginBottom: "12px" }}
      />

      {/* Vista previa */}
      {files.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: "8px",
            marginBottom: "15px",
          }}
        >
          {files.map((file, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`foto-${index}`}
                style={{
                  width: "100%",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          ))}
        </div>
      )}

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
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Conectando con Mercado Pago..." : "Ir al Pago"}
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </form>
  );
}
