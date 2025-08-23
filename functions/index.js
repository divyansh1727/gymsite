const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // your Gmail app password
  },
});

exports.sendRegistrationPDF = functions.firestore
  .document("users/{userId}") // adjust collection name if different
  .onCreate(async (snap, context) => {
    const data = snap.data();

    try {
      // Create PDF
      const doc = new PDFDocument();
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", async () => {
        const pdfData = Buffer.concat(buffers);

        // Mail options
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "admin@gmail.com", // change to your admin email
          subject: "New Registration PDF",
          text: "A new registration has been submitted. See attached PDF.",
          attachments: [
            {
              filename: "registration.pdf",
              content: pdfData,
            },
          ],
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Email sent with PDF!");
      });

      // PDF Content
      doc.fontSize(18).text("Registration Details", { underline: true });
      doc.moveDown();

      doc.fontSize(12).text(`Name: ${data.name || ""}`);
      doc.text(`Email: ${data.email || ""}`);
      doc.text(`Phone: ${data.phone || ""}`);
      doc.text(`Payment Method: ${data.paymentMethod || "Not Provided"}`); // ✅ added
      // Add any other fields you need

      doc.end();
    } catch (error) {
      console.error("Error sending registration PDF:", error);
    }
  });
