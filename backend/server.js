import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();
const app = express();
app.use(cors());

// ✅ Multer setup (keep files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Send email with uploaded PDF
app.post("/send-email", upload.single("pdf"), async (req, res) => {
  try {
    const { name, plan } = req.body;

    // ✅ Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // 🔑 App Password
      },
    });

    // ✅ Send Email
    await transporter.sendMail({
      from: `"Ritik Fitness" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // admin email
      subject: `New Registration: ${name}`,
      html: `
        <h3>New Registration</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Plan:</b> ${plan}</p>
        <p>📎 PDF is attached below.</p>
      `,
      attachments: [
        {
          filename: `${name}_${plan}.pdf`,
          content: req.file.buffer, // use buffer from upload
        },
      ],
    });

    res.json({ success: true, message: "✅ Email sent to admin with PDF" });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ success: false, error: "Email sending failed" });
  }
});

app.listen(4000, () =>
  console.log("✅ Backend running on http://localhost:4000")
);
