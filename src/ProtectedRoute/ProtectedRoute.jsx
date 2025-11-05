// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateToken } from "../API/api.js";

const ProtectedRouteForDealer = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await validateToken();
          console.log("Dealer token validation response:", response);
          if (response.success) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        } catch (error) {
          console.error("Dealer token validation failed:", error);
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    };
    checkToken();
  }, [token]);

  if (isValid === null)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100 animate-pulse z-50">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-6"></div>

        {/* Animated Text */}
        <p className="text-2xl font-bold text-green-700 animate-bounce">
          Loading...
        </p>
      </div>
    );

  return isValid ? children : <Navigate to="/login" />;
};

export { ProtectedRouteForDealer };
