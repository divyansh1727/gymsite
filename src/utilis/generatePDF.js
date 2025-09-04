import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default async function generatePDF(formData, plan) {
  // Create a new PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
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

  // ✅ Add photo (if base64 image)
  if (formData.photo) {
    const imgBytes = await fetch(formData.photo).then((res) => res.arrayBuffer());
    let img;
    if (formData.photo.startsWith("data:image/png")) {
      img = await pdfDoc.embedPng(imgBytes);
    } else {
      img = await pdfDoc.embedJpg(imgBytes);
    }
    const imgPage = pdfDoc.addPage([595, 842]);
    imgPage.drawText("User Photo", { x: 50, y: 800, size: 16, font });
    imgPage.drawImage(img, { x: 50, y: 500, width: 200, height: 200 });
  }

  // ✅ Add document (image OR full PDF)
  if (formData.document) {
    if (formData.document.startsWith("data:image/")) {
      // Image case
      const imgBytes = await fetch(formData.document).then((res) => res.arrayBuffer());
      let img;
      if (formData.document.startsWith("data:image/png")) {
        img = await pdfDoc.embedPng(imgBytes);
      } else {
        img = await pdfDoc.embedJpg(imgBytes);
      }
      const imgPage = pdfDoc.addPage([595, 842]);
      imgPage.drawText("Attached Document", { x: 50, y: 800, size: 16, font });
      imgPage.drawImage(img, { x: 50, y: 200, width: 400, height: 500 });
    } else if (formData.document.startsWith("data:application/pdf")) {
      // PDF case → append ALL pages
      const pdfBytes = await fetch(formData.document).then((res) => res.arrayBuffer());
      const donorPdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(donorPdf, donorPdf.getPageIndices());
      copiedPages.forEach((p) => pdfDoc.addPage(p));
    }
  }

  // Return as Blob
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
