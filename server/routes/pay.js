import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 🧾 Inicialización del cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// 📦 Endpoint: Crear preferencia de pago
router.post("/", async (req, res) => {
  try {
    const preference = new Preference(client);
    const body = {
      items: [
        {
          title: "Pedido de Fotoimanes",
          quantity: 1,
          unit_price: 2000,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/confirmacion",
        failure: "http://localhost:5173/error",
      },
      auto_return: "approved",
    };

    const result = await preference.create({ body });
    res.json({ id: result.id });
  } catch (error) {
    console.error("Error al crear pago:", error);
    res.status(500).json({ error: "No se pudo iniciar el pago." });
  }
});

export default router;
