// src/utils/generatePDF.js
import jsPDF from "jspdf";

export default async function generatePDF(formData, plan) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Gym Registration Details", 105, 20, { align: "center" });

  // User details
  doc.setFontSize(12);
  doc.text(`Name: ${formData.name}`, 20, 40);
  doc.text(`Email: ${formData.email}`, 20, 50);
  doc.text(`Phone: ${formData.phone}`, 20, 60);
  doc.text(`Plan: ${plan.name} (${plan.price})`, 20, 70);
  doc.text(`Gender: ${formData.gender}`, 20, 80);
  doc.text(`Blood Group: ${formData.bloodGroup}`, 20, 90);
  doc.text(`Address: ${formData.address}`, 20, 100);

  if (formData.previousHealthProblems?.length > 0) {
    doc.text(
      `Health Issues: ${formData.previousHealthProblems.join(", ")}`,
      20,
      110
    );
  }

  if (formData.photo) {
    doc.addImage(formData.photo, "JPEG", 150, 40, 40, 40); 
    doc.text("Photo:", 150, 35);
  }

  // ✅ Return as Blob for Firebase upload
  return doc.output("blob");
}
