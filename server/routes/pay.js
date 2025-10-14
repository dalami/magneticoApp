import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Inicializa Mercado Pago con el token correcto
const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
});

router.post("/", async (req, res) => {
  try {
    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: "fotoimanes",
          title: "Pedido de Fotoimanes",
          quantity: 1,
          unit_price: 2000,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: req.body.email || "cliente@test.com",
        name: req.body.name || "Cliente",
      },
      back_urls: {
        success: "https://magnetico-app.vercel.app/confirmacion",
        failure: "https://magnetico-app.vercel.app/error",
        pending: "https://magnetico-app.vercel.app/pendiente",
      },
      auto_return: "approved",
      notification_url: "https://magnetico-server.onrender.com/api/webhook",
    };

    const result = await preference.create({ body });

    console.log("✅ Preferencia creada:", result.id);
    res.json({ id: result.id });
  } catch (error) {
    console.error("❌ Error al crear pago:", error.message);
    if (error.cause) console.error("🧩 Detalle:", error.cause);
    res.status(500).json({ error: "No se pudo iniciar el pago." });
  }
});

export default router;
