import { useState } from "react";
import { Scan } from "lucide-react";

const DeviceDetailsForm = ({ formData, setFormData, onSubmit,setShowForm }) => {
  const years = ["1 Year", "2 Years", "3 Years", "5 Years", "10 Years"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-center mb-4">Fill Device Details</h2>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="imei"
          value={formData.imei}
          onChange={handleChange}
          placeholder="IMEI"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="deviceId"
          value={formData.deviceId}
          onChange={handleChange}
          placeholder="Device ID"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="deviceName"
          value={formData.deviceName}
          onChange={handleChange}
          placeholder="Device Name"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="cellType"
          value={formData.cellType}
          onChange={handleChange}
          placeholder="Cell Type"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="cellUsed"
          value={formData.cellUsed}
          onChange={handleChange}
          placeholder="Cells Used"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="cellBrand"
          value={formData.cellBrand}
          onChange={handleChange}
          placeholder="Cell Brand Name"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="bmsName"
          value={formData.bmsName}
          onChange={handleChange}
          placeholder="BMS Name"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="casingName"
          value={formData.casingName}
          onChange={handleChange}
          placeholder="Casing Name"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />
        <input
          type="text"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity (mAh)"
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        />

        {/* Warranty Dropdown */}
        <select
          name="warranty"
          value={formData.warranty || ""}
          onChange={handleChange}
          className="border border-gray-200 p-2 w-[95%] rounded-md text-sm bg-white"
        >
          <option value="" disabled>
            Warranty*
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button className="border border-gray-300 bg-red-100 px-6 py-3 rounded-md text-sm font-medium hover:bg-red-400" 
        onClick={()=>{
          setShowForm(false)
        }}
        >
          Cancel
        </button>
        <button className="border border-gray-300 bg-gray-300 px-6 py-3 flex items-center gap-2 rounded-md text-sm font-medium hover:bg-white">
          <Scan size={18} />
          Scan & Add
        </button>
        <button
          onClick={onSubmit}
          className="border border-gray-300 bg-green-300 px-6 py-3 rounded-md text-sm font-medium hover:bg-[#019D6D]"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DeviceDetailsForm;
