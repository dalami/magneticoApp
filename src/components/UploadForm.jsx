import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { api } from "../Lib/api.js";
import { fmtARS } from "../Lib/currency.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function UploadForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
  const [mpUrl, setMpUrl] = useState("");
  const [showManualRedirect, setShowManualRedirect] = useState(false);
  const [rotation, setRotation] = useState(0);

  // 🔥 FUNCIÓN PARA VOLVER
  const handleVolver = () => {
    if (loading) return;

    if (photos.length > 0) {
      const confirmar = window.confirm(
        "¿Estás seguro de que querés volver? Se perderán las fotos que subiste."
      );
      if (!confirmar) return;
    }

    navigate(-1);
  };

  // Obtener plan seleccionado desde la navegación
  useEffect(() => {
    if (location.state?.planSeleccionado) {
      setPlanSeleccionado(location.state.planSeleccionado);
      setPrice(
        location.state.planSeleccionado.precio_total /
          location.state.planSeleccionado.cantidad
      );
      setPriceLoading(false);
    } else {
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
          console.warn(
            "⚠️ No se pudo cargar el precio, usando valor por defecto:",
            error.message
          );
          setPrice(2000);
        } finally {
          setPriceLoading(false);
        }
      };
      fetchPrice();
    }
  }, [location]);

  const total = planSeleccionado
    ? planSeleccionado.precio_total
    : photos.length * price;

  const maxFotos = planSeleccionado ? planSeleccionado.cantidad : 20;
  const minFotos = planSeleccionado ? planSeleccionado.cantidad : 4;

  // DEBUG: Mostrar estado actual
  useEffect(() => {
    console.log("🔍 DEBUG Estado actual:", {
      loading,
      photosCount: photos.length,
      minFotos,
      maxFotos,
      planSeleccionado,
      planCantidad: planSeleccionado?.cantidad,
      isButtonDisabled:
        loading ||
        photos.length < minFotos ||
        (planSeleccionado && photos.length !== planSeleccionado.cantidad),
    });
  }, [loading, photos, minFotos, planSeleccionado]);

  const compressImage = useCallback((file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(resolve, "image/jpeg", quality);
        };
      };
    });
  }, []);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (photos.length + files.length > maxFotos) {
      setError(
        `Máximo ${maxFotos} fotos permitidas en el plan ${
          planSeleccionado?.plan || ""
        }`
      );
      return;
    }

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFiles.length > 0) {
      setError("Solo se permiten archivos de imagen");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setShowManualRedirect(false);

      setSuccess("⏳ Comprimiendo imágenes...");

      const compressedPhotos = [];
      for (const file of files) {
        const compressedBlob = await compressImage(file);
        const compressedFile = new File([compressedBlob], file.name, {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        });
        compressedPhotos.push(compressedFile);
      }

      setPhotos((prev) => [...prev, ...compressedPhotos]);
      setSuccess(
        `✅ ${compressedPhotos.length} imagen(es) comprimida(s) y lista(s)`
      );

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error comprimiendo imágenes:", error);
      setError("Error al procesar las imágenes");
      setPhotos((prev) => [...prev, ...files]);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setError("");
  };

  const rotatePhoto = (index, degrees = 90) => {
    setPhotos((prev) =>
      prev.map((file, i) => {
        if (i === index) {
          const rotatedFile = new File([file], file.name, {
            type: file.type,
            lastModified: new Date().getTime(),
          });
          rotatedFile._rotation = ((file._rotation || 0) + degrees) % 360;
          return rotatedFile;
        }
        return file;
      })
    );
  };

  const getCroppedImg = useCallback(
    async (imageSrc, cropAreaPixels, rotation = 0) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const radians = (rotation * Math.PI) / 180;
          const sin = Math.abs(Math.sin(radians));
          const cos = Math.abs(Math.cos(radians));

          const width = cropAreaPixels.width;
          const height = cropAreaPixels.height;

          const newWidth = width * cos + height * sin;
          const newHeight = width * sin + height * cos;

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.translate(newWidth / 2, newHeight / 2);
          ctx.rotate(radians);
          ctx.translate(-width / 2, -height / 2);

          ctx.drawImage(
            image,
            cropAreaPixels.x,
            cropAreaPixels.y,
            cropAreaPixels.width,
            cropAreaPixels.height,
            0,
            0,
            width,
            height
          );

          canvas.toBlob(resolve, "image/jpeg", 0.9);
        };
      });
    },
    []
  );

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const saveCrop = async () => {
    if (cropIndex === null || !croppedAreaPixels) return;

    try {
      const file = photos[cropIndex];
      const imageUrl = URL.createObjectURL(file);
      const blob = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);

      const croppedFile = new File([blob], file.name, {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      });

      croppedFile._rotation = (file._rotation || 0) + rotation;

      setPhotos((prev) =>
        prev.map((f, i) => (i === cropIndex ? croppedFile : f))
      );
      setCropIndex(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);

      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Error al recortar imagen:", error);
      setError("Error al recortar la imagen");
    }
  };

  const rotateInModal = (degrees = 90) => {
    setRotation((prev) => {
      const newRotation = (prev + degrees) % 360;
      return newRotation < 0 ? newRotation + 360 : newRotation;
    });
  };

  const handleSendPhotos = async () => {
    console.log("🔄 Iniciando handleSendPhotos...");

    setError("");
    setSuccess("");
    setShowManualRedirect(false);
    setMpUrl("");

    // Validaciones
    if (!name.trim()) {
      setError("Por favor ingresá tu nombre completo");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor ingresá un email válido");
      return;
    }

    if (planSeleccionado) {
      if (photos.length !== planSeleccionado.cantidad) {
        setError(
          `El plan ${planSeleccionado.plan} incluye ${planSeleccionado.cantidad} fotoimanes. Subiste ${photos.length} fotos.`
        );
        return;
      }
    } else {
      if (photos.length < minFotos) {
        setError(
          `Debes subir al menos ${minFotos} fotos para realizar el pedido`
        );
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    formData.append("address", address.trim());

    photos.forEach((photo, index) => {
      const fileName = `foto_${index + 1}_${Date.now()}.jpg`;
      formData.append("photos", photo, fileName);
    });

    if (planSeleccionado) {
      formData.append("plan", planSeleccionado.plan);
      formData.append("cantidad", planSeleccionado.cantidad);
      formData.append("precio_total", planSeleccionado.precio_total);
      formData.append("precio_original", planSeleccionado.precio_original);
      formData.append("descuento", planSeleccionado.descuento || 0);
      formData.append("tipo", "fotoimanes_plan");
    } else {
      formData.append("tipo", "fotoimanes_unitario");
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("⏳ Procesando tu pedido...");

      console.log("🚀 Enviando pedido a /send-photos...");

      // 🔥 CORRECCIÓN: Usar el endpoint correcto
      const res = await api.post("/send-photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });

      console.log("✅ Respuesta del servidor:", res.data);

      if (res.data?.payment?.init_point) {
        const mercadoPagoUrl = res.data.payment.init_point;
        setMpUrl(mercadoPagoUrl);

        console.log("🎯 URL Mercado Pago:", mercadoPagoUrl);
        setSuccess("✅ ¡Pedido exitoso! Redirigiendo a Mercado Pago...");

        // Abrir Mercado Pago en nueva pestaña
        const mpWindow = window.open(mercadoPagoUrl, "_blank");

        // 🔥 CERRAR LOADING INMEDIATAMENTE después de abrir MP
        setLoading(false);
        setSuccess(
          "✅ ¡Pedido exitoso! Completá el pago en la nueva ventana de Mercado Pago."
        );

        // Focus en la nueva ventana
        if (mpWindow) {
          mpWindow.focus();
        }

        // Mostrar botón manual como backup
        setTimeout(() => {
          setShowManualRedirect(true);
        }, 2000);
      } else {
        console.error("❌ No se recibió init_point en la respuesta");
        setError("No se recibió link de pago del servidor");
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Error completo:", err);

      if (err.response?.data?.error) {
        setError(`❌ ${err.response.data.error}`);
      } else if (err.code === "ECONNABORTED") {
        setError("⏰ El servidor está tardando demasiado. Intentá nuevamente.");
      } else if (err.response?.status === 413) {
        setError(
          "📸 Las fotos son demasiado grandes. Reducí el tamaño e intentá nuevamente."
        );
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

  const handleManualRedirect = () => {
    if (mpUrl) {
      window.location.href = mpUrl;
    }
  };

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(photo));
        }
      });
    };
  }, [photos]);

  // Calcular si el botón debe estar deshabilitado
  const isButtonDisabled =
    loading ||
    photos.length < minFotos ||
    (planSeleccionado ? photos.length !== planSeleccionado.cantidad : false);

  console.log("🔘 Estado del botón:", {
    isButtonDisabled,
    loading,
    photosCount: photos.length,
    minFotos,
    planSeleccionado: !!planSeleccionado,
    planCantidad: planSeleccionado?.cantidad,
  });

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
        position: "relative",
      }}
    >
      {/* BOTÓN VOLVER */}
      <button
        onClick={handleVolver}
        disabled={loading}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "transparent",
          border: "1px solid #BCA88F",
          color: "#BCA88F",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "0.9rem",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          opacity: loading ? 0.5 : 1,
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.background = "#BCA88F";
            e.target.style.color = "#fff";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.background = "transparent";
            e.target.style.color = "#BCA88F";
          }
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      <img
        src="/images/magnetocp.jpg"
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

      {/* Mostrar información del plan */}
      {planSeleccionado && (
        <div
          style={{
            background: "#E8F5E9",
            border: "2px solid #4CAF50",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              margin: "0 0 10px 0",
              color: "#2E7D32",
              fontSize: "1.1rem",
            }}
          >
            📦 Plan {planSeleccionado.plan}
          </h3>
          <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
            <strong>Cantidad:</strong> {planSeleccionado.cantidad} fotoimanes
          </p>
          <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
            <strong>Precio total:</strong>{" "}
            {fmtARS(planSeleccionado.precio_total)}
          </p>
          {planSeleccionado.descuento > 0 && (
            <p
              style={{ margin: "5px 0", fontSize: "0.9rem", color: "#4CAF50" }}
            >
              <strong>Descuento:</strong> {planSeleccionado.descuento}% OFF
            </p>
          )}
        </div>
      )}

      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: 20 }}>
        {planSeleccionado
          ? `Subí exactamente ${planSeleccionado.cantidad} fotos para tu plan ${planSeleccionado.plan} ✨`
          : "Subí tus fotos, recortalas y completá tus datos para el envío ✨"}
      </p>

      {/* SECCIÓN DE DATOS PERSONALES */}
      <div style={{ marginBottom: "15px" }}>
        <h3
          style={{
            fontSize: "1.1rem",
            color: "#3B2F2F",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          📋 Tus datos
        </h3>

        <input
          type="text"
          placeholder="Tu nombre completo *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Tu correo electrónico *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          disabled={loading}
        />

        <input
          type="tel"
          placeholder="Tu teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
          disabled={loading}
        />

        <textarea
          placeholder="Tu dirección para el envío(Direccion,Localidad,provincia,CP)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          disabled={loading}
          rows={3}
        />
      </div>

      {/* SECCIÓN DE FOTOS */}
      <div style={{ marginBottom: "15px" }}>
        <h3
          style={{
            fontSize: "1.1rem",
            color: "#3B2F2F",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          📸 Tus fotos
        </h3>

        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            style={{
              ...inputStyle,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading || photos.length >= maxFotos}
          />
          <small
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
              fontSize: "0.8rem",
            }}
          >
            {photos.length}/{maxFotos}
          </small>
        </div>
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <small
            style={{
              color: "#666",
              fontSize: "0.75rem",
              fontStyle: "italic",
            }}
          >
            ⚠️ Mínimo {minFotos} fotos
          </small>
        </div>

        {photos.length > 0 && (
          <div style={{ marginBottom: 15 }}>
            <p style={{ fontWeight: 500, marginBottom: "10px" }}>
              Previsualización ({photos.length} foto
              {photos.length > 1 ? "s" : ""})
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
                      transform: `rotate(${p._rotation || 0}deg)`,
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => {
                      if (!loading) {
                        setCropIndex(i);
                        setRotation(p._rotation || 0);
                      }
                    }}
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
                      zIndex: 2,
                    }}
                    title="Eliminar foto"
                    disabled={loading}
                  >
                    ×
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      !loading && rotatePhoto(i, 90);
                    }}
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 5,
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      cursor: loading ? "not-allowed" : "pointer",
                      color: "#BCA88F",
                      fontWeight: "bold",
                      opacity: loading ? 0.5 : 1,
                      zIndex: 2,
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Girar 90°"
                    disabled={loading}
                  >
                    ⟳
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resumen según plan o sistema antiguo */}
      {photos.length > 0 && (
        <div style={summaryStyle}>
          {planSeleccionado ? (
            <>
              <strong>Plan {planSeleccionado.plan}:</strong> {photos.length}/
              {planSeleccionado.cantidad} fotos
              <br />
              <strong>Total: {fmtARS(total)}</strong>
              {planSeleccionado.descuento > 0 && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#4CAF50",
                    marginTop: "5px",
                  }}
                >
                  Incluye {planSeleccionado.descuento}% de descuento
                </div>
              )}
            </>
          ) : priceLoading ? (
            "Cargando precio..."
          ) : (
            <>
              {photos.length} foto{photos.length > 1 ? "s" : ""} ×{" "}
              {fmtARS(price)} = <strong>{fmtARS(total)}</strong>
            </>
          )}
        </div>
      )}

      {error && <div style={msgStyle("#FCE4E4", "#C0392B")}>{error}</div>}

      {success && <div style={msgStyle("#E8F5E9", "#2E7D32")}>{success}</div>}

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

      {/* BOTÓN PRINCIPAL CON DEBUG */}
      <button
        onClick={handleSendPhotos}
        disabled={isButtonDisabled}
        style={{
          width: "100%",
          background: isButtonDisabled ? "#ccc" : "#BCA88F",
          color: "#fff",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (!isButtonDisabled) {
            e.target.style.background = "#A8927A";
          }
        }}
        onMouseLeave={(e) => {
          if (!isButtonDisabled) {
            e.target.style.background = "#BCA88F";
          }
        }}
        title={
          isButtonDisabled
            ? `Condiciones no cumplidas: 
          loading: ${loading}
          fotos: ${photos.length}/${minFotos}
          plan: ${
            planSeleccionado
              ? `${photos.length}/${planSeleccionado.cantidad}`
              : "N/A"
          }`
            : "Enviar pedido"
        }
      >
        {loading
          ? "⏳ Procesando..."
          : planSeleccionado
          ? `📤 Enviar ${photos.length}/${
              planSeleccionado.cantidad
            } Fotos y Pagar ${fmtARS(total)}`
          : `📤 Enviar ${photos.length} Foto${
              photos.length > 1 ? "s" : ""
            } y Pagar ${fmtARS(total)}`}
      </button>

      {/* DEBUG INFO (solo en desarrollo) */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f5f5f5",
            borderRadius: "5px",
            fontSize: "0.8rem",
            textAlign: "left",
          }}
        >
          <strong>DEBUG:</strong>
          <br />
          Loading: {loading ? "✅" : "❌"}
          <br />
          Fotos: {photos.length}/{minFotos}{" "}
          {photos.length >= minFotos ? "✅" : "❌"}
          <br />
          {planSeleccionado &&
            `Plan: ${photos.length}/${planSeleccionado.cantidad} ${
              photos.length === planSeleccionado.cantidad ? "✅" : "❌"
            }`}
          <br />
          Botón: {isButtonDisabled ? "❌ DESHABILITADO" : "✅ HABILITADO"}
        </div>
      )}

      {/* Modal de recorte */}
      {cropIndex !== null && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  background: "#2a2a2a",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Rotación: {rotation}°
                </span>
                <button
                  onClick={() => rotateInModal(-90)}
                  style={rotateButtonStyle}
                  title="Girar 90° a la izquierda"
                >
                  ↶ 90°
                </button>
                <button
                  onClick={() => rotateInModal(90)}
                  style={rotateButtonStyle}
                  title="Girar 90° a la derecha"
                >
                  ↷ 90°
                </button>
                <button
                  onClick={() => setRotation(0)}
                  style={{ ...rotateButtonStyle, background: "#666" }}
                  title="Resetear rotación"
                >
                  ⟲ 0°
                </button>
              </div>

              <div style={{ flex: 1, position: "relative" }}>
                <Cropper
                  image={URL.createObjectURL(photos[cropIndex])}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={78 / 53}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                  style={{
                    containerStyle: {
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#000",
                    },
                  }}
                />
              </div>
            </div>
            <div style={modalButtons}>
              <button
                style={btnCancel}
                onClick={() => {
                  setCropIndex(null);
                  setRotation(0);
                }}
                disabled={loading}
              >
                Cancelar
              </button>
              <button style={btnSave} onClick={saveCrop} disabled={loading}>
                Guardar Recorte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos (se mantienen igual)
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.9rem",
  boxSizing: "border-box",
  fontFamily: "Poppins, sans-serif",
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
  height: "80vh",
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

const rotateButtonStyle = {
  background: "#BCA88F",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  minWidth: "70px",
};
