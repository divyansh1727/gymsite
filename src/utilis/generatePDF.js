import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// ✅ Helper: Convert base64 → Uint8Array
function base64ToUint8Array(base64) {
  const base64Data = base64.split(",")[1]; // remove prefix
  const binary = atob(base64Data);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export default async function generatePDF(formData, plan) {
  // Create a new PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title
  page.drawText("Ritik Fitness Registration", {
    x: 50,
    y: height - 50,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  });

  // Basic details
  const lines = [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Phone: ${formData.phone}`,
    `Gender: ${formData.gender}`,
    `Blood Group: ${formData.bloodGroup}`,
    `Address: ${formData.address}`,
    `Plan: ${plan.name} (${plan.price})`,
    `Payment Method: ${formData.paymentMethod || "N/A"}`,
    `Health Problems: ${
      formData.previousHealthProblems?.length
        ? formData.previousHealthProblems.join(", ")
        : "None"
    }`,
  ];

  lines.forEach((text, i) => {
    page.drawText(text, {
      x: 50,
      y: height - 100 - i * 20,
      size: 12,
      font,
    });
  });

  // ✅ Add photo safely
  if (formData.photo) {
    try {
      const imgBytes = base64ToUint8Array(formData.photo);
      let img = null;

      if (formData.photo.startsWith("data:image/png")) {
        img = await pdfDoc.embedPng(imgBytes);
      } else if (
        formData.photo.startsWith("data:image/jpeg") ||
        formData.photo.startsWith("data:image/jpg")
      ) {
        img = await pdfDoc.embedJpg(imgBytes);
      }

      if (img) {
        const imgPage = pdfDoc.addPage([595, 842]);
        imgPage.drawText("User Photo", { x: 50, y: 800, size: 16, font });
        imgPage.drawImage(img, { x: 50, y: 500, width: 200, height: 200 });
      } else {
        const imgPage = pdfDoc.addPage([595, 842]);
        imgPage.drawText("Unsupported photo format", { x: 50, y: 800, size: 16, font });
      }
    } catch (err) {
      console.error("Error embedding photo:", err);
      const errorPage = pdfDoc.addPage([595, 842]);
      errorPage.drawText("Could not embed photo.", { x: 50, y: 800, size: 16, font });
    }
  }

  // ✅ Add document safely (image OR full PDF)
  if (formData.document) {
    try {
      if (formData.document.startsWith("data:image/")) {
        const imgBytes = base64ToUint8Array(formData.document);
        let img = null;

        if (formData.document.startsWith("data:image/png")) {
          img = await pdfDoc.embedPng(imgBytes);
        } else if (
          formData.document.startsWith("data:image/jpeg") ||
          formData.document.startsWith("data:image/jpg")
        ) {
          img = await pdfDoc.embedJpg(imgBytes);
        }

        if (img) {
          const imgPage = pdfDoc.addPage([595, 842]);
          imgPage.drawText("Attached Document", { x: 50, y: 800, size: 16, font });
          imgPage.drawImage(img, { x: 50, y: 200, width: 400, height: 500 });
        } else {
          const imgPage = pdfDoc.addPage([595, 842]);
          imgPage.drawText("Unsupported document image format", { x: 50, y: 800, size: 16, font });
        }
      } else if (formData.document.startsWith("data:application/pdf")) {
        const pdfBytes = base64ToUint8Array(formData.document);
        const donorPdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(donorPdf, donorPdf.getPageIndices());
        copiedPages.forEach((p) => pdfDoc.addPage(p));
      } else {
        const imgPage = pdfDoc.addPage([595, 842]);
        imgPage.drawText("Unsupported document type", { x: 50, y: 800, size: 16, font });
      }
    } catch (err) {
      console.error("Error embedding document:", err);
      const errorPage = pdfDoc.addPage([595, 842]);
      errorPage.drawText("Could not embed document.", { x: 50, y: 800, size: 16, font });
    }
  }

  // ✅ Return final PDF Blob
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}