import React, { useEffect, useState } from "react";
import Ball from "../Images/bell.png";
import User from "../Images/user.png";
import { useNavigate } from "react-router-dom";
import {validateToken} from "../API/api.js";

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const token = localStorage.getItem("Name");

  const [TokenValidation , setTokenvalidation ] = useState(false);

  useEffect(() =>{
    (async () => {
      const response = await  validateToken();
      setTokenvalidation(response.success);
      console.log("response is get summery  : -" , response.success);
    })();

  },[]);

  function onclick() {
    console.log("i am called");
    navigate("/profile");
  }

  return (
    <div className="h-18 w-full bg-[#019D6D] flex justify-between items-center px-4 overflow-hidden">
      <h1 className="text-white font-bold text-2xl">Lithium India</h1>
      <div className="flex items-center gap-6">
        {isAuthenticated && TokenValidation ? 
          <button
            onClick={() => {
              localStorage.removeItem("accessToken"); // Replace with your token key
               navigate("/login");
            }}
            className="text-white bg-red-400 text-sm font-bold border border-white px-3 py-2 rounded-xl shadow-md
             hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Logout
          </button> : ""
        }
      </div>
    </div>
  );
}

export default Header;
