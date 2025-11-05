import React from "react";

const Toggle = ({ value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
        value ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-all ${
          value ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Toggle;
