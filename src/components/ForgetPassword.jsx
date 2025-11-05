import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getOTP} from "../API/GetOtp.js";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email!");
      return;
    }
     
    getOTP(email.toString()).then(otp => {
      console.log('Received OTP:', otp);
      localStorage.setItem("ForgetPasswordOTP", otp);
      localStorage.setItem("ForgetPasswordEmail", email);
      toast.success("OTP sent to your email!");
      navigate('/otp-verification');
    }).catch((error)=>{
      console.log('error :- ', error);
      toast.error("Error is ", error);
    });
  };

  return (
    <div className="flex mt-10 items-start justify-center min-h-screen bg-white px-4 md:px-0 relative">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-semibold text-center text-gray-800 mt-4">
          Forget password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Please enter your registered email, we will send you a verification code.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-500 text-sm text-left font-medium mb-2">
              Email
            </label>
            <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg">
              <span className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5H4.5a2.25 2.25 0 01-2.25-2.25V6.75"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75l8.25 6 8.25-6"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none ml-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[30%] bg-[#019D6D] hover:bg-green-700 text-white py-1.5 rounded-lg text-sm font-medium"
            >
              Get OTP
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notifications - Centered Horizontally */}
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

      {/* Inline style tag (no jsx attribute!) */}
      <style>{`
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
