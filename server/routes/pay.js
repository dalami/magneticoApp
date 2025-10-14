import express from "express";
import mercadopago from "mercadopago";

const router = express.Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const body = {
      items: [
        {
          title: `Pedido de ${name || "Cliente"}`,
          quantity: 1,
          unit_price: 2000, // 🔹 monto fijo de prueba
          currency_id: "ARS",
        },
      ],
      payer: {
        email,
      },
      back_urls: {
        success: "https://magnetico-app.vercel.app/success",
        failure: "https://magnetico-app.vercel.app/failure",
      },
      auto_return: "approved",
    };

    const result = await mercadopago.preferences.create(body);
    res.json(result.body);
  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    res.status(500).json({ error: "No se pudo crear la preferencia" });
  }
});

export default router;
