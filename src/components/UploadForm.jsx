import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { api } from "../Lib/api.js";
import { fmtARS } from "../Lib/currency.js";
import logo from "/magnetocp.jpg";

export default function UploadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [cropIndex, setCropIndex] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [price, setPrice] = useState(2000);
  const [priceLoading, setPriceLoading] = useState(true);
  
  // 🔥 NUEVOS ESTADOS PARA REDIRECCIÓN
  const [mpUrl, setMpUrl] = useState("");
  const [showManualRedirect, setShowManualRedirect] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setPriceLoading(true);
        const res = await api.get("/config/price");
        if (res.data?.price) {
          setPrice(res.data.price);
        } else if (res.data?.unit_price) {
          setPrice(res.data.unit_price);
        }
      } catch (error) {
        console.warn("⚠️ No se pudo cargar el precio, usando valor por defecto:", error.message);
        setPrice(2000);
      } finally {
        setPriceLoading(false);
      }
    };
    
    fetchPrice();
  }, []);

  const total = photos.length * price;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (photos.length + files.length > 20) {
      setError("Máximo 20 fotos permitidas");
      return;
    }

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    
    if (invalidFiles.length > 0) {
      setError("Solo se permiten archivos de imagen");
      return;
    }

    setPhotos(prev => [...prev, ...files]);
    setError("");
    setSuccess("");
    setShowManualRedirect(false); // Resetear redirección manual
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setError("");
  };

  const getCroppedImg = useCallback(async (imageSrc, cropAreaPixels) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = cropAreaPixels.width;
        canvas.height = cropAreaPixels.height;
        
        ctx.drawImage(
          image,
          cropAreaPixels.x,
          cropAreaPixels.y,
          cropAreaPixels.width,
          cropAreaPixels.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        
        canvas.toBlob(resolve, "image/jpeg", 0.9);
      };
    });
  }, []);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const saveCrop = async () => {
    if (cropIndex === null || !croppedAreaPixels) return;
    
    try {
      const file = photos[cropIndex];
      const imageUrl = URL.createObjectURL(file);
      const blob = await getCroppedImg(imageUrl, croppedAreaPixels);
      
      const croppedFile = new File([blob], file.name, { 
        type: "image/jpeg",
        lastModified: new Date().getTime()
      });
      
      setPhotos((prev) =>
        prev.map((f, i) => (i === cropIndex ? croppedFile : f))
      );
      setCropIndex(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Error al recortar imagen:", error);
      setError("Error al recortar la imagen");
    }
  };

  // 🔥 FUNCIÓN PRINCIPAL ACTUALIZADA CON BOTÓN MANUAL
  const handleSendPhotos = async () => {
    setError("");
    setSuccess("");
    setShowManualRedirect(false);
    setMpUrl("");

    if (!name.trim()) {
      setError("Por favor ingresá tu nombre completo");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingresá un email válido");
      return;
    }

    if (photos.length < 4) {
      setError("Debes subir al menos 4 fotos para realizar el pedido");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    
    photos.forEach((photo, index) => {
      const fileName = `foto_${index + 1}_${Date.now()}.jpg`;
      formData.append("photos", photo, fileName);
    });

    try {
      setLoading(true);
      setError("");
      setSuccess("⏳ Procesando tu pedido...");
      
      console.log("🚀 Enviando pedido a producción...");

      const res = await api.post("/send-photos", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      console.log("✅ Respuesta del servidor:", res.data);

      if (res.data?.payment?.init_point) {
        const mercadoPagoUrl = res.data.payment.init_point;
        setMpUrl(mercadoPagoUrl);
        
        console.log("🎯 URL de Mercado Pago:", mercadoPagoUrl);
        setSuccess("✅ ¡Pedido exitoso! Redirigiendo a Mercado Pago...");

        // 🔥 PRIMER INTENTO DE REDIRECCIÓN (automática)
        setTimeout(() => {
          console.log("🔗 Redirigiendo automáticamente...");
          window.location.href = mercadoPagoUrl;
        }, 100);

        // 🔥 SEGUNDO INTENTO (más agresivo)
        setTimeout(() => {
          console.log("🔗 Segundo intento de redirección...");
          window.location.replace(mercadoPagoUrl);
        }, 800);

        // 🔥 MOSTRAR BOTÓN MANUAL SI NO REDIRIGE EN 2 SEGUNDOS
        setTimeout(() => {
          setShowManualRedirect(true);
          setSuccess("✅ ¡Pedido exitoso! Si no te redirige automáticamente, hacé clic en el botón 'IR A MERCADO PAGO'");
        }, 2000);

      } else {
        setError("No se recibió link de pago del servidor");
        setLoading(false);
      }

    } catch (err) {
      console.error("❌ Error completo:", err);
      
      if (err.response?.data?.error) {
        setError(`❌ ${err.response.data.error}`);
      } else if (err.code === 'ECONNABORTED') {
        setError("⏰ Tiempo de espera agotado. Intentá nuevamente.");
      } else if (err.response?.status === 413) {
        setError("📸 Las fotos son demasiado grandes. Reducí el tamaño e intentá nuevamente.");
      } else if (err.response?.status === 429) {
        setError("🚫 Demasiados intentos. Esperá unos minutos.");
      } else if (!navigator.onLine) {
        setError("🌐 Sin conexión a internet. Verificá tu conexión.");
      } else {
        setError("❌ Error al procesar el pedido. Intentá nuevamente.");
      }
      setLoading(false);
    }
  };

  // 🔥 FUNCIÓN PARA REDIRECCIÓN MANUAL
  const handleManualRedirect = () => {
    if (mpUrl) {
      console.log("🔗 Redirigiendo manualmente a:", mpUrl);
      window.location.href = mpUrl;
    }
  };

  useEffect(() => {
    return () => {
      photos.forEach(photo => {
        if (photo instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(photo));
        }
      });
    };
  }, [photos]);

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "18px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: "480px",
        width: "95%",
        margin: "2rem auto",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <img
        src={logo}
        alt="Magnético"
        style={{
          width: 100,
          height: 100,
          borderRadius: "12px",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />
      <h2 style={{ fontWeight: 600, color: "#3B2F2F" }}>
        Magnético Fotoimanes
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: 20 }}>
        Subí tus fotos, recortalas al formato 78×53 mm y completá tu pedido ✨
      </p>

      <input
        type="text"
        placeholder="Tu nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
        disabled={loading}
      />
      
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileChange}
          style={{
            ...inputStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading || photos.length >= 20}
        />
        <small style={{ 
          position: "absolute", 
          right: "10px", 
          top: "50%", 
          transform: "translateY(-50%)",
          color: "#666",
          fontSize: "0.8rem"
        }}>
          {photos.length}/20
        </small>
      </div>

      {photos.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <p style={{ fontWeight: 500, marginBottom: "10px" }}>
            Previsualización ({photos.length} foto{photos.length > 1 ? 's' : ''})
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
              gap: "10px",
              maxHeight: "200px",
              overflowY: "auto",
              padding: "5px",
            }}
          >
            {photos.map((p, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(p)}
                  alt={`foto-${i}`}
                  style={{
                    width: "100%",
                    aspectRatio: "1.47/1",
                    borderRadius: 6,
                    objectFit: "cover",
                    border: "2px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => !loading && setCropIndex(i)}
                />
                <button
                  onClick={() => !loading && removePhoto(i)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    cursor: loading ? "not-allowed" : "pointer",
                    color: "#C0392B",
                    fontWeight: 700,
                    opacity: loading ? 0.5 : 1,
                  }}
                  title="Eliminar foto"
                  disabled={loading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div style={summaryStyle}>
          {priceLoading ? (
            "Cargando precio..."
          ) : (
            <>
              {photos.length} foto{photos.length > 1 ? "s" : ""} × {fmtARS(price)} ={" "}
              <strong>{fmtARS(total)}</strong>
            </>
          )}
        </div>
      )}

      {error && (
        <div style={msgStyle("#FCE4E4", "#C0392B")}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={msgStyle("#E8F5E9", "#2E7D32")}>
          {success}
        </div>
      )}

      {/* 🔥 BOTÓN DE REDIRECCIÓN MANUAL A MERCADO PAGO */}
      {showManualRedirect && mpUrl && (
        <button
          onClick={handleManualRedirect}
          style={{
            width: "100%",
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "10px",
            boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#218838";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#28a745";
            e.target.style.transform = "translateY(0)";
          }}
        >
          💳 IR A MERCADO PAGO PARA PAGAR
        </button>
      )}

      <button
        onClick={handleSendPhotos}
        disabled={loading || photos.length < 4 || priceLoading}
        style={{
          width: "100%",
          background: (loading || photos.length < 4 || priceLoading) ? "#ccc" : "#BCA88F",
          color: "#fff",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: (loading || photos.length < 4 || priceLoading) ? "not-allowed" : "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading && photos.length >= 4 && !priceLoading) {
            e.target.style.background = "#A8927A";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && photos.length >= 4 && !priceLoading) {
            e.target.style.background = "#BCA88F";
          }
        }}
      >
        {loading ? (
          "⏳ Procesando..."
        ) : priceLoading ? (
          "⏳ Cargando..."
        ) : (
          `📤 Enviar ${photos.length} Foto${photos.length > 1 ? 's' : ''} y Pagar ${fmtARS(total)}`
        )}
      </button>

      {cropIndex !== null && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Cropper
                image={URL.createObjectURL(photos[cropIndex])}
                crop={crop}
                zoom={zoom}
                aspect={78 / 53}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <div style={modalButtons}>
              <button 
                style={btnCancel} 
                onClick={() => setCropIndex(null)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                style={btnSave} 
                onClick={saveCrop}
                disabled={loading}
              >
                Guardar Recorte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos (sin cambios)
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.9rem",
  boxSizing: "border-box",
};

const summaryStyle = {
  background: "#F8F5F0",
  borderRadius: 8,
  padding: 12,
  marginBottom: 15,
  fontWeight: 600,
  color: "#3B2F2F",
  fontSize: "0.9rem",
};

const msgStyle = (bg, color) => ({
  backgroundColor: bg,
  color,
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontWeight: 500,
  fontSize: "0.9rem",
  textAlign: "center",
});

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "20px",
};

const modalContent = {
  position: "relative",
  width: "90vw",
  maxWidth: "500px",
  height: "70vh",
  background: "#000",
  borderRadius: "12px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const modalButtons = {
  display: "flex",
  justifyContent: "space-around",
  padding: "15px",
  background: "#1a1a1a",
  gap: "10px",
};

const btnCancel = {
  background: "#666",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  flex: 1,
};

const btnSave = {
  background: "#BCA88F",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  flex: 1,
};