import { useState } from "react";

const UpdateDeviceDetailsForm = ({
  formData2 = {},
  setformData2,
  onSubmit2,
  setShowForm2,
}) => {
  const years = [
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "5 Years", value: 5 },
    { label: "10 Years", value: 10 },
  ];

  const [errors, setErrors] = useState({});

  const errorMessages = {
    imei: "Device IMEI number is required",
    deviceId: "Device ID is required",
    deviceName: "Device Name is required",
    cellType: "Cell Type is required",
    cellUsed: "Cell used is required",
    cellBrand: "Cell Brand is required",
    bmsName: "BMS Used is required",
    casingName: "Casing is required",
    capacity: "Cell mAh is required",
    warranty: "Warranty is required",
  };

  const isNumeric = (v) => /^\d+$/.test(String(v).trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData2((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmed = (value ?? "").trim();

    if (!trimmed) {
      setErrors((prev) => ({ ...prev, [name]: errorMessages[name] }));
      return;
    }

    if (name === "cellUsed" || name === "capacity") {
      if (!isNumeric(trimmed)) {
        setErrors((prev) => ({
          ...prev,
          [name]: name === "cellUsed"
            ? "Cell used must be a number"
            : "Cell mAh must be a number",
        }));
        return;
      }
    }
  };

  const validateForm = () => {
    const fd = {
      imei: formData2.imei ?? "",
      deviceId: formData2.deviceId ?? "",
      deviceName: formData2.deviceName ?? "",
      cellType: formData2.cellType ?? "",
      cellUsed: formData2.cellUsed ?? "",
      cellBrand: formData2.cellBrand ?? "",
      bmsName: formData2.bmsName ?? "",
      casingName: formData2.casingName ?? "",
      capacity: formData2.capacity ?? "",
      warranty: formData2.warranty ?? "",
    };

    const newErrors = {};

    Object.entries(fd).forEach(([k, v]) => {
      if (!String(v).trim()) newErrors[k] = errorMessages[k];
    });

    if (String(fd.cellUsed).trim() && !isNumeric(fd.cellUsed)) {
      newErrors.cellUsed = "Cell used must be a number";
    }
    if (String(fd.capacity).trim() && !isNumeric(fd.capacity)) {
      newErrors.capacity = "Cell mAh must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      ...formData2,
      cellUsed: String(formData2.cellUsed ?? ""),
      capacity: String(formData2.capacity ?? ""),
    };

    onSubmit2(requestData);
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-center mb-5">
        Update Device Details
      </h2>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* imei */}
        <div className="flex flex-col">
          <input
            type="text"
            name="imei"
            value={formData2.imei ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Device IMEI no.*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.imei ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.imei && <span className="text-red-500 text-xs mt-1">{errors.imei}</span>}
        </div>

        {/* deviceId */}
        <div className="flex flex-col">
          <input
            type="text"
            name="deviceId"
            value={formData2.deviceId ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Device Id*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.deviceId ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.deviceId && <span className="text-red-500 text-xs mt-1">{errors.deviceId}</span>}
        </div>

        {/* deviceName */}
        <div className="flex flex-col">
          <input
            type="text"
            name="deviceName"
            value={formData2.deviceName ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Device Name*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.deviceName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.deviceName && <span className="text-red-500 text-xs mt-1">{errors.deviceName}</span>}
        </div>

        {/* cellType */}
        <div className="flex flex-col">
          <input
            type="text"
            name="cellType"
            value={formData2.cellType ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Cell Type*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.cellType ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cellType && <span className="text-red-500 text-xs mt-1">{errors.cellType}</span>}
        </div>

        {/* cellUsed */}
        <div className="flex flex-col">
          <input
            type="number"
            name="cellUsed"
            value={formData2.cellUsed ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Cell Used*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.cellUsed ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cellUsed && <span className="text-red-500 text-xs mt-1">{errors.cellUsed}</span>}
        </div>

        {/* cellBrand */}
        <div className="flex flex-col">
          <input
            type="text"
            name="cellBrand"
            value={formData2.cellBrand ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Cell Brand*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.cellBrand ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cellBrand && <span className="text-red-500 text-xs mt-1">{errors.cellBrand}</span>}
        </div>

        {/* bmsName */}
        <div className="flex flex-col">
          <input
            type="text"
            name="bmsName"
            value={formData2.bmsName ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="BMS Used*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.bmsName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.bmsName && <span className="text-red-500 text-xs mt-1">{errors.bmsName}</span>}
        </div>

        {/* casingName */}
        <div className="flex flex-col">
          <input
            type="text"
            name="casingName"
            value={formData2.casingName ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Casing*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.casingName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.casingName && <span className="text-red-500 text-xs mt-1">{errors.casingName}</span>}
        </div>

        {/* capacity */}
        <div className="flex flex-col">
          <input
            type="number"
            name="capacity"
            value={formData2.capacity ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Cell mAh*"
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.capacity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.capacity && <span className="text-red-500 text-xs mt-1">{errors.capacity}</span>}
        </div>

        {/* Warranty Dropdown */}
        <div className="flex flex-col">
          <select
            name="warranty"
            value={formData2.warranty ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`border p-2 w-full rounded-md text-sm bg-white ${
              errors.warranty ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Warranty*
            </option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
          {errors.warranty && <span className="text-red-500 text-xs mt-1">{errors.warranty}</span>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          className="border border-red-300 bg-red-100 hover:bg-white p-2 rounded-md text-sm w-full"
          onClick={() => {
            setformData2({
              imei: "",
              deviceId: "",
              deviceName: "",
              cellType: "",
              cellUsed: "",
              cellBrand: "",
              bmsName: "",
              casingName: "",
              capacity: "",
              warranty: "",
            });
            setShowForm2(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#019D6D] text-white hover:bg-white border border-green-300 hover:text-black p-2 rounded-md text-sm w-full"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateDeviceDetailsForm;
