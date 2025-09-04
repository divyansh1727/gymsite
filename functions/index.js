// Import required packages
const { onDocumentCreated } = require("firebase-functions/v2/firestore"); // ✅ v2 Firestore trigger
const { defineSecret } = require("firebase-functions/params"); // ✅ Secrets
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

admin.initializeApp();

// ✅ Define Gmail credentials as secrets (must be added in Firebase console/CLI)
const gmailUser = defineSecret("GMAIL_USER");
const gmailPass = defineSecret("GMAIL_PASS");

// ✅ Firestore Trigger (on new document in 'registrations')
exports.sendRegistrationPDF = onDocumentCreated(
  {
    document: "registrations/{regId}",
    secrets: [gmailUser, gmailPass], // required for Gmail auth
    region: "us-central1", // ✅ ensure region is set
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.error("❌ No data found in event");
      return null;
    }

    const data = snapshot.data();

    try {
      // ✅ Generate PDF as a buffer
      const pdfBuffer = await new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", reject);

        // PDF Content
        doc.fontSize(18).text("Registration Details", { underline: true });
        doc.moveDown();

        doc.fontSize(12).text(`Name: ${data.name || ""}`);
        doc.text(`Email: ${data.email || ""}`);
        doc.text(`Phone: ${data.phone || ""}`);
        doc.text(`Plan: ${data.planName || ""} - ${data.planPrice || ""}`);
        doc.text(`Payment Method: ${data.paymentMethod || "Not Provided"}`);

        doc.end();
      });

      // ✅ Setup transporter with Gmail secrets
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser.value(),
          pass: gmailPass.value(),
        },
      });

      // ✅ Mail options
      const mailOptions = {
        from: gmailUser.value(),
        to: "ritikfitness14@gmail.com", // ⚡ change to your admin email
        subject: "New Registration PDF",
        text: `A new registration has been submitted by ${data.name || "Unknown User"}. See attached PDF.`,
        attachments: [{ filename: "registration.pdf", content: pdfBuffer }],
      };

      await transporter.sendMail(mailOptions);
      console.log("📩 Email sent with PDF!");
      return null;
    } catch (error) {
      console.error("❌ Error sending registration PDF:", error);
      return null;
    }
  }
);
