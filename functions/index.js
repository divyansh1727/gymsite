const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,// generated in Google account
  },
});

exports.sendRegistrationPDF = functions.firestore
  .document("registrations/{regId}")
  .onCreate(async (snap, context) => {
    try{ 
    const data = snap.data();
    const pdfBytes = Uint8Array.from(data.pdfData).buffer;

    
     await transporter.sendMail({
  from: "Gym Registration <ritikfitness14@gmail.com>",
  to: `${data.email}, ritikfitness14@gmail.com`, // send to both user & admin
  subject: `🏋️ New Gym Registration - ${data.planName} Plan`,
  text: `New registration received:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nPlan: ${data.planName}\n\nA PDF receipt is attached.`,
  attachments: [
    {
      filename: `${data.name}_${data.planName}.pdf`,
      content: pdfBytes,
    },
  ],
});

    
     console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
});
  

