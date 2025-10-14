import express from "express";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import payRoutes from "./routes/pay.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use("/api/pay", payRoutes);

app.post("/api/orders", upload.array("photos"), async (req, res) => {
  const { name, email } = req.body;
  const files = req.files;
  if (!email || !files.length)
    return res.status(400).json({ error: "Faltan datos o archivos." });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    }));

    await transporter.sendMail({
      from: `"Magnetico Fotoimanes" <${process.env.EMAIL_USER}>`,
      to: process.env.DESTINATION_EMAIL,
      subject: `📸 Pedido de ${name || "Cliente"} (${email})`,
      text: `Nombre: ${name}\nEmail: ${email}\nCantidad: ${files.length}`,
      attachments,
    });

    res.json({ message: "Pedido enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el pedido." });
  }
});

app.listen(5000, () => console.log("🚀 Servidor corriendo en puerto 5000"));
