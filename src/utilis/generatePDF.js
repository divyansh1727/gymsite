import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// ✅ Convert base64 → Uint8Array safely
function base64ToUint8Array(base64) {
  try {
    const base64Data = base64.split(",")[1]; // remove prefix
    const cleaned = base64Data.replace(/\s/g, ""); // strip whitespace/newlines
    const binary = atob(cleaned);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch (err) {
    console.error("Invalid base64:", err, base64?.slice(0, 50));
    return null;
  }
}

export default async function generatePDF(formData, plan) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ✅ Title
  page.drawText("Ritik Fitness Registration", {
    x: 50,
    y: height - 50,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  });

  // ✅ User Details
  const lines = [
    `Name: ${formData.name || ""}`,
    `Email: ${formData.email || ""}`,
    `Phone: ${formData.phone || ""}`,
    `Gender: ${formData.gender || ""}`,
    `Blood Group: ${formData.bloodGroup || ""}`,
    `Address: ${formData.address || ""}`,
    `Plan: ${plan?.name || ""} (${plan?.price || ""})`,
    `Payment Method: ${formData.paymentMethod || "N/A"}`,
    `Health Problems: ${formData.previousHealthProblems?.length ? formData.previousHealthProblems.join(", ") : "None"}`,
  ];

  lines.forEach((text, i) => {
    page.drawText(text, {
      x: 50,
      y: height - 100 - i * 20,
      size: 12,
      font,
    });
  });

  // ✅ Add Photo
  if (formData.photo && formData.photo.startsWith("data:image/")) {
    try {
      console.log("Processing photo...");
      const imgBytes = base64ToUint8Array(formData.photo);
      if (!imgBytes) throw new Error("Invalid photo data");

      let img = null;
      if (formData.photo.includes("data:image/png")) {
        console.log("Detected PNG format");
        img = await pdfDoc.embedPng(imgBytes);
      } else if (
        formData.photo.includes("data:image/jpeg") ||
        formData.photo.includes("data:image/jpg")
      ) {
        console.log("Detected JPEG format");
        img = await pdfDoc.embedJpg(imgBytes);
      }

      if (!img) throw new Error("Unsupported image format");

      console.log("Image dimensions:", img.width, img.height);

      const imgPage = pdfDoc.addPage([595, 842]);
      imgPage.drawText("User Photo", { x: 50, y: 800, size: 16, font });

      const pageWidth = 595 - 100;
      const pageHeight = 842 - 250;
      const scale = Math.min(pageWidth / img.width, pageHeight / img.height);
      const { width, height } = img.scale(scale);

      console.log("Scaled dimensions:", width, height);

      imgPage.drawImage(img, {
        x: 50,
        y: 200,
        width,
        height,
      });
    } catch (err) {
      console.error("Error embedding photo:", err);
      const errorPage = pdfDoc.addPage([595, 842]);
      errorPage.drawText("⚠️ Could not embed photo.", {
        x: 50,
        y: 800,
        size: 16,
        font,
      });
    }
  }

  // ✅ Add Document (image or PDF)
  if (formData.document) {
    try {
      if (formData.document.startsWith("data:image/")) {
        console.log("Processing document as image...");
        const imgBytes = base64ToUint8Array(formData.document);
        if (!imgBytes) throw new Error("Invalid document image data");

        let img = null;
        if (formData.document.includes("data:image/png")) {
          console.log("Document is PNG format");
          img = await pdfDoc.embedPng(imgBytes);
        } else if (
          formData.document.includes("data:image/jpeg") ||
          formData.document.includes("data:image/jpg")
        ) {
          console.log("Document is JPEG format");
          img = await pdfDoc.embedJpg(imgBytes);
        }

        if (!img) throw new Error("Unsupported document image format");

        const imgPage = pdfDoc.addPage([595, 842]);
        imgPage.drawText("Attached Document", { x: 50, y: 800, size: 16, font });

        const pageWidth = 595 - 100;
        const pageHeight = 842 - 250;
        const scale = Math.min(pageWidth / img.width, pageHeight / img.height);
        const { width, height } = img.scale(scale);

        console.log("Document scaled dimensions:", width, height);

        imgPage.drawImage(img, {
          x: 50,
          y: 200,
          width,
          height,
        });
      } else if (formData.document.startsWith("data:application/pdf")) {
        console.log("Processing document as PDF...");
        const pdfBytes = base64ToUint8Array(formData.document);
        if (!pdfBytes) throw new Error("Invalid embedded PDF");

        const donorPdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(
          donorPdf,
          donorPdf.getPageIndices()
        );
        copiedPages.forEach((p) => pdfDoc.addPage(p));
        console.log("PDF pages embedded successfully");
      } else {
        console.error("Unsupported document format");
        const errorPage = pdfDoc.addPage([595, 842]);
        errorPage.drawText("⚠️ Unsupported document type", {
          x: 50,
          y: 800,
          size: 16,
          font,
        });
      }
    } catch (err) {
      console.error("Error embedding document:", err);
      const errorPage = pdfDoc.addPage([595, 842]);
      errorPage.drawText("⚠️ Could not embed document.", {
        x: 50,
        y: 800,
        size: 16,
        font,
      });
    }
  }

 // ✅ Save PDF
const pdfBytes = await pdfDoc.save();
console.log("PDF generation completed.");

// ✅ Create a download link for testing without breaking existing code
const blob = new Blob([pdfBytes], { type: "application/pdf" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "test.pdf";
a.textContent = "Download PDF";
a.style.position = "fixed";
a.style.bottom = "20px";
a.style.left = "20px";
a.style.background = "#4CAF50";
a.style.color = "white";
a.style.padding = "10px 20px";
a.style.borderRadius = "5px";
a.style.zIndex = "1000";
document.body.appendChild(a);

// ✅ Return the Blob as before
return blob;
}
