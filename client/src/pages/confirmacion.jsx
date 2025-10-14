import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Confirmacion() {
  const [status, setStatus] = useState("Procesando tu pedido...");

  useEffect(() => {
    const sendOrder = async () => {
      const pending = JSON.parse(localStorage.getItem("pendingOrder"));
      if (!pending) {
        setStatus("No hay pedido pendiente.");
        return;
      }

      const formData = new FormData();
      formData.append("name", pending.name);
      formData.append("email", pending.email);

      try {
        await axios.post("http://localhost:5000/api/orders", formData);
        setStatus("✅ ¡Pago confirmado! Tu pedido fue enviado correctamente.");
        localStorage.removeItem("pendingOrder");
      } catch (err) {
        console.error(err);
        setStatus("❌ Hubo un error al enviar tu pedido.");
      }
    };

    sendOrder();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem", fontFamily: "Poppins" }}>
      <h2>{status}</h2>
    </div>
  );
}
