import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginDealer } from "../API/DEALERSIDE_API/Api.js";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePhone = (phone) => /^\d{10}$/.test(phone?.trim?.());

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      phone: phone?.trim?.(),
      password: password?.trim?.(),
    };

    const isValid = () => {
      if (!validatePhone(phone)) {
        toast.error("Enter a valid 10-digit phone number!");
        return false;
      }
      if (password.length < 6) {
        toast.error("Password too short!");
        return false;
      }
      return true;
    };

    if (!isValid()) return;

    const fun = async () => {
      const response = await loginDealer(data);

      console.log("response is ", response);
      if (response && response.accessToken) {
        toast.success("Login successful!");
        await localStorage.setItem("accessToken", response.accessToken);
        setTimeout(() => {
          navigate("/DealerDashboard");
        }, 1000);
      } else {
        if (response.message) {
          toast.error(response.message);
        } else {
          toast.error("Something Went Wrong Please try again..");
        }
      }
    };

    fun();
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-white-100 px-4 pt-28 md:px-0 relative">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#003827]">
          Lithium India
        </h1>

        <p className="text-center text-2xl font-bold text-gray-500 mb-6">
          Dealer Login
        </p>

        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {/* Dealer Phone Input */}
          <div className="mb-4 w-[90%]">
            <label className="block text-gray-600 text-sm font-medium text-left mb-2">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white w-full">
              <span className="text-green-600">📱</span>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="w-full bg-transparent focus:outline-none ml-2 placeholder-gray-400 text-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4 w-[90%]">
            <label className="block text-gray-600 text-sm font-medium mb-2 text-left">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="text-green-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="text-right mt-1">
              <Link
                to="/forget-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[30%] bg-[#019D6D] hover:bg-green-700 text-white py-2 rounded-lg font-medium mx-auto"
          >
            Log In
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        transition={Slide}
        toastStyle={{ fontSize: "18px", textAlign: "center" }}
        className="custom-toast-container"
      />

      <style>{`
        .custom-toast-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
}
