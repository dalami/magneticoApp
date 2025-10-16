export default function SuccessPage() {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "6rem",
      fontFamily: "Poppins, sans-serif",
      color: "#333"
    }}>
      <img
        src="/logo.png"
        alt="Magnético"
        style={{ width: 120, marginBottom: 20 }}
      />
      <h1 style={{ color: "#2ecc71" }}>✅ ¡Pago confirmado!</h1>
      <p style={{ fontSize: "1.1rem", marginTop: 10 }}>
        Gracias por tu compra en <b>Magnético Fotoimanes</b>.
      </p>
      <p style={{ color: "#555", marginBottom: 30 }}>
        Tu pedido está siendo procesado. Te contactaremos pronto por email.
      </p>
      <a
        href="/"
        style={{
          background: "#2ecc71",
          color: "#fff",
          textDecoration: "none",
          padding: "12px 25px",
          borderRadius: 8,
          fontWeight: 600,
          transition: "background 0.3s"
        }}
        onMouseOver={(e) => (e.target.style.background = "#27ae60")}
        onMouseOut={(e) => (e.target.style.background = "#2ecc71")}
      >
        Volver a la tienda
      </a>
    </div>
  );
}

