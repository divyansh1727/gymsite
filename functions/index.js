const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp();

// Gmail setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thakurdivy84@gmail.com",        // Replace with your Gmail
    pass: "duqo tmbe nhyg rwyt"     // Use App Password from Google
  }
});
//duqo tmbe nhyg rwyt

// Trigger on new payment document
exports.sendPDFToAdmin = functions.firestore
  .document("payments/{paymentId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "thakurdivy84@gmail.com",
      to: "divys2705@gmail.com",
      subject: `New Payment by ${data.name}`,
      html: `<p>${data.name} has purchased a plan.</p>`,
      attachments: [
        {
          filename: "Plan.pdf",
          path: data.pdfUrl   // Make sure your PDF URL is stored in Firestore
        }
      ]
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
