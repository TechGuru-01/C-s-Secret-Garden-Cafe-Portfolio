import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { getInquiryTemplate } from "./templates/contactTemplate.js";
import { getReservationTemplate } from "./templates/bookingTemplate.js";
import { sendReservationTemplate } from "./templates/customerBookingTemplate.js";
import { sendInquiryTemplate } from "./templates/customerContactTemplate.js";

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

app.post(["/contact", "/api/contact"], formLimiter, async (req, res) => {
  const { name, email, title, message } = req.body;
  try {
    const contactMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Inquiry: ${title}`,
      html: getInquiryTemplate(name, email, title, message),
    };
    const customerContactMailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Secret Inquiry: ${title}`,
      html: sendInquiryTemplate(name, email, title, message),
    };

    await Promise.all([
      transporter.sendMail(contactMailOptions),
      transporter.sendMail(customerContactMailOption),
    ]);

    return res.status(200).json({ success: true, message: "Inquiry sent!" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res
      .status(500)
      .json({ success: false, message: `Failed: ${error.message}` });
  }
});

app.post(
  ["/reservation", "/api/reservation"],
  formLimiter,
  async (req, res) => {
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
      const customerMailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Secret Reservation Ticket",
        html: sendReservationTemplate(
          guests,
          date,
          time,
          name,
          email,
          phone,
          notes,
        ),
      };
      await Promise.all([
        transporter.sendMail(bookingMailOption),
        transporter.sendMail(customerMailOption),
      ]);
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
  },
);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;
