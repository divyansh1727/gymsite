// backend/firebaseAdmin.js
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" }; 
// ⬆️ Download this JSON from Firebase Console > Project Settings > Service Accounts

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com", // replace with your Firebase bucket
});

const bucket = admin.storage().bucket();
export { bucket };
