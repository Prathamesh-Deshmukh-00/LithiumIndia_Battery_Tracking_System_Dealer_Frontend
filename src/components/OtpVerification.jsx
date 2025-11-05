import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getOTP } from "../API/GetOtp.js";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();

  // Countdown for resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Handle OTP input change
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace for OTP input
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Validate OTP
  const handleSubmit = () => {
    const otpValue = otp.join("");

    if (otpValue.length < 5) {
      toast.error("Please enter a complete 5-digit OTP!");
      return;
    }

    const forgetPasswordOtp = localStorage.getItem("ForgetPasswordOTP");
    if (otpValue === forgetPasswordOtp) {
      toast.success("OTP verified successfully!");
      localStorage.setItem("ForgetPasswordOTP", "");
      setTimeout(() => {
        navigate("/reset-password");
      }, 500);
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    try {
      const email = localStorage.getItem("ForgetPasswordEmail");
      if (!email) {
        toast.error("Email not found. Please restart the process.");
        return;
      }

      const newOtp = await getOTP(email);
      if (newOtp) {
        localStorage.setItem("ForgetPasswordOTP", newOtp);
        toast.success("OTP resent successfully!");
        setResendTimer(30); // restart timer
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong while resending OTP.");
    }
  };

  return (
    <div className="flex mt-10 items-start justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl mb-2 font-semibold text-center">Enter OTP</h2>
        <p className="text-center text-gray-500 text-sm">
          OTP has been sent to your phone
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mt-6 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        <p
          className={`text-end mr-14 text-sm ${
            resendTimer === 0 ? "text-blue-500 cursor-pointer" : "text-gray-400"
          }`}
          onClick={resendTimer === 0 ? handleResendOTP : null}
        >
          {resendTimer === 0 ? "Resend OTP" : `Resend OTP in ${resendTimer}s`}
        </p>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="w-[30%] mt-6 py-2 bg-[#019D6D] text-white font-semibold rounded-lg hover:bg-green-700"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastStyle={{ fontSize: "16px", textAlign: "center" }}
        className="custom-toast-container"
      />

      {/* Custom CSS for Horizontal Alignment */}
      <style jsx>{`
        .custom-toast-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
