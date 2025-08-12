import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterButton() {
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    navigate("/extra-details", { state: { role: "user" } });
  };

  const handleEmail = async () => {
    // You can first take email/password input from a form
    const email = prompt("Enter Email:");
    const password = prompt("Enter Password:");
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/extra-details", { state: { role } });
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="bg-green-500 px-4 py-2 rounded">Register</button>
      {showModal && (
        <RegisterModal
          onGoogle={handleGoogle}
          onEmail={handleEmail}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

