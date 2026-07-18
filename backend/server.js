import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { getInquiryTemplate } from "./contactTemplate.js";
import { getReservationTemplate } from "./bookingTemplate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: "Too many attempts. Try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/api/contact", formLimiter, async (req, res) => {
  const { name, email, title, message } = req.body;
  try {
    const contactMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Inquiry: ${title}`,
      html: getInquiryTemplate(name, email, title, message),
    };

    await transporter.sendMail(contactMailOptions);
    return res.status(200).json({ success: true, message: "Inquiry sent!" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res
      .status(500)
      .json({ success: false, message: `Failed: ${error.message}` });
  }
});

app.post("/api/reservation", formLimiter, async (req, res) => {
  const { guests, date, time, name, email, phone, notes } = req.body;
  try {
    const bookingMailOption = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Reservation",
      html: getReservationTemplate(
        guests,
        date,
        time,
        name,
        email,
        phone,
        notes,
      ),
    };
    await transporter.sendMail(bookingMailOption);
    return res.status(200).json({
      success: true,
      message: "Reservation completed and email sent successfully!",
    });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res
      .status(500)
      .json({ success: false, message: `Failed: ${error.message}` });
  }
});

// FIX 1: Only call listen if running locally outside of Vercel serverless environments
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// FIX 2: Export the app instance so Vercel can catch it and wrap it automatically
export default app;
