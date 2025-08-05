"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneSignin() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSendOTP = async () => {
    // Setup invisible reCAPTCHA (only once)
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
      });
    }

    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult; // Save globally
      router.push("/otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In with Phone</h1>
      <input
        type="tel"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full max-w-sm rounded"
      />
      <button
        onClick={handleSendOTP}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded"
      >
        Send OTP
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
}
