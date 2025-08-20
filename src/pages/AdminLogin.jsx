// AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1=choose method, 2=phone input, 3=OTP input

  // ===== Google Login =====
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === "admin") {
        navigate("/admin/panel");
      } else {
        alert("Access denied. Only admins can login.");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // ===== Phone Login =====
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  const sendOTP = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep(3); // move to OTP input
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      // Check admin role in Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === "admin") {
        navigate("/admin/panel");
      } else {
        alert("Access denied. Only admins can login.");
      }
    } catch (error) {
      console.error("Invalid OTP:", error);
    }
  };

  return (
    <div className="login-page p-4">
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="p-2 bg-blue-600 text-white"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => setStep(2)}
            className="p-2 bg-green-600 text-white"
          >
            Sign in with Phone
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-2">
          <input
            type="tel"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2"
          />
          <button onClick={sendOTP} className="p-2 bg-green-600 text-white">
            Send OTP
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2"
          />
          <button onClick={verifyOTP} className="p-2 bg-green-600 text-white">
            Verify OTP
          </button>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}
