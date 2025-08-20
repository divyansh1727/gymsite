const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

exports.sendRegistrationPDF = functions.firestore
  .document("registrations/{regId}")
  .onCreate(async (snap, context) => {
    try {
      const data = snap.data();

      const attachments = [];

      // ✅ Generated PDF
      if (data.pdfBase64) {
        const pdfBuffer = Buffer.from(data.pdfBase64, "base64");
        attachments.push({
          filename: `${data.name}_${data.planName}_Generated.pdf`,
          content: pdfBuffer,
        });
      }

      // ✅ User-uploaded PDF
      if (data.documentBase64) {
        const docBuffer = Buffer.from(data.documentBase64, "base64");
        attachments.push({
          filename: `${data.name}_${data.planName}_UserDocument.pdf`,
          content: docBuffer,
        });
      }

      await transporter.sendMail({
        from: `Gym Registration <${process.env.EMAIL_USER}>`,
        to: `ritikfitness14@gmail.com, ${data.email}`, // admin + user
        subject: `🏋️ New Gym Registration - ${data.planName} Plan`,
        text: `New registration received:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPlan: ${data.planName}\n\nPDFs are attached.`,
        attachments,
      });

      console.log("✅ Email sent successfully to admin and user!");
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  });
