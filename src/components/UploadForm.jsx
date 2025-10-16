import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import logo from "/magnetocp.jpg";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Configuración base
  const PRODUCT_PRICE = Number(import.meta.env.VITE_DEFAULT_PRICE) || 2000;
  const API_URL = useMemo(
    () => (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, ""),
    []
  );

  // 📸 Previsualización de imágenes
  useEffect(() => {
    if (!files.length) return;
    const nextPreviews = files.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      url: URL.createObjectURL(file),
    }));
    setPreviews(nextPreviews);
    return () => nextPreviews.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [files]);

  // 📤 Manejar selección de archivos
  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files || []));
    setMessage("");
  };

  // 💳 Enviar pedido al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !files.length) {
      setMessage("⚠️ Completá todos los campos antes de continuar.");
      return;
    }

    try {
      setLoading(true);
      setMessage("🔄 Conectando con Mercado Pago...");

      console.log("📸 Fotos seleccionadas:", files.map(f => f.name));
      console.log("📧 Email:", email);
      console.log("👤 Nombre:", name);
      console.log("🧮 Cantidad de fotos:", files.length);
      console.log("💵 Precio unitario:", PRODUCT_PRICE);
      console.log("💰 Total esperado:", PRODUCT_PRICE * files.length);
      console.log("🌐 API_URL:", API_URL);

      const { data } = await axios.post(`${API_URL}/api/pay`, {
        name,
        email,
        quantity: files.length, // ✅ Cantidad real
      });

      console.log("🟢 Respuesta del backend:", data);

      const redirect = data?.checkout_url || data?.init_point || data?.sandbox_init_point;
      if (!redirect) throw new Error("Respuesta inválida del servidor.");

      console.log("🔗 Checkout URL:", redirect);

      // 🔸 Delay de 2 segundos para leer logs antes de redirigir
      setTimeout(() => {
        window.location.href = redirect;
      }, 2000);

    } catch (error) {
      console.error("❌ Error al pagar:", error?.response?.data || error.message);
      setMessage("❌ No se pudo iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  const total = PRODUCT_PRICE * files.length;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: 360,
        textAlign: "center",
        margin: "20px auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ width: 295, height: 200, margin: "0 auto 10px" }}>
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
        style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        required
      />

      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
        style={{ marginBottom: 12, width: "100%" }}
      />

      {/* 🔹 Previsualizaciones */}
      {previews.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {previews.map(({ id, url }) => (
            <div key={id}>
              <img
                src={url}
                alt={id}
                style={{
                  width: "100%",
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* 💰 Total */}
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        {files.length} foto{files.length !== 1 ? "s" : ""} × ${PRODUCT_PRICE} = ${total}
      </div>

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
