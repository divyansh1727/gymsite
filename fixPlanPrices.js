import { db } from "./src/firebase.js"; // note the relative path and .js extension
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// adjust path

async function fixPlanPrices() {
  const plansRef = collection(db, "plans");
  const snapshot = await getDocs(plansRef);

  snapshot.forEach(async (planDoc) => {
    const data = planDoc.data();
    let price = data.price;

    // Convert price to numeric
    let numericPrice = String(price || "0")
      .replace(/[^0-9.]/g, "") // remove ₹, commas, spaces
      .replace(/,/g, "");

    numericPrice = parseFloat(numericPrice);
    if (isNaN(numericPrice) || numericPrice <= 0) numericPrice = 1; // fallback

    await updateDoc(doc(db, "plans", planDoc.id), {
      price: numericPrice
    });

    console.log(`Updated plan "${data.name}" to price: ${numericPrice}`);
  });
}

fixPlanPrices();
