import React, { useState, useEffect } from "react";
import { api } from "../Lib/api.js";
import { fmtARS } from "../Lib/currency.js";
import logo from "/magnetocp.jpg";

export default function UploadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [price, setPrice] = useState(2000);

  // 🔹 Obtener precio actual del backend
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/price");
        if (res.data?.unit_price) setPrice(res.data.unit_price);
      } catch {
        console.warn("No se pudo obtener el precio. Usando default.");
      }
    })();
  }, []);

  const total = photos.length * price;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || photos.length === 0) {
      setError("Completá tu nombre, correo y subí al menos una foto 📸");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    photos.forEach((p) => formData.append("photos", p));

    try {
      setLoading(true);
      const res = await api.post("/pay/order", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.init_point) {
        window.location.href = res.data.init_point;
      } else {
        throw new Error("No se recibió la URL de pago.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Ocurrió un error al procesar tu pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "2.5rem",
        borderRadius: "18px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        width: "90%",
        margin: "2rem auto",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <img
        src={logo}
        alt="Magnético"
        style={{
          width: 120,
          height: 120,
          borderRadius: "12px",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />

      <h2 style={{ fontWeight: 600, color: "#3B2F2F", marginBottom: 5 }}>
        Magnético Fotoimanes
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: 20 }}>
        Subí tus fotos (78×53 mm) y completá tu pedido
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "0.9rem",
          }}
        />

        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "0.9rem",
          }}
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        {photos.length > 0 && (
          <div
            style={{
              background: "#F8F5F0",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "15px",
              fontWeight: 600,
              color: "#3B2F2F",
            }}
          >
            {photos.length} foto{photos.length > 1 ? "s" : ""} × {fmtARS(price)}{" "}
            = {fmtARS(total)}
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "#FCE4E4",
              color: "#C0392B",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "10px",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#ccc" : "#BCA88F",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "Procesando..." : "Ir al Pago"}
        </button>
      </form>
    </div>
  );
}
