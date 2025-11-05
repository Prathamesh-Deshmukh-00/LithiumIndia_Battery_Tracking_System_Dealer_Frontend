import { useEffect, useState } from "react";
import { getCustomer } from "../API/getCustomer.js";
import { getAllIndependentCustomers } from "../API/DEALERSIDE_API/Api.js";

const DeviceDetailsForm = ({ formData, setFormData, onSubmit, setShowForm, type }) => {
  const years = [
    { label: "1 Year", value: 1 },
    { label: "2 Years", value: 2 },
    { label: "3 Years", value: 3 },
    { label: "5 Years", value: 5 },
    { label: "10 Years", value: 10 },
  ];

  const [Customer, setCustomer] = useState([
    { customerId: "680627f8402dad6e2bdcbb65", name: "Varun lodhi" },
    { customerId: "680b753d087bfe00cfb4fef2", name: "Mohit lodhi" },
  ]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (type) {
      getCustomer()
        .then((customer) => {
          setCustomer(customer);
        })
        .catch((error) => console.error("Error while getting customer data:", error));
    } else {
      getAllIndependentCustomers()
        .then((response) => {
          const customers = response.data.map((customer) => ({
            customerId: customer.customerId,
            customerName: customer.customerName,
          }));
          setCustomer(customers);
        })
        .catch((error) => console.error("Error fetching independent customer data:", error));
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers for specific fields
    if ((name === "cellUsed" || name === "capacity") && value !== "") {
      if (!/^\d*$/.test(value)) return;
    }

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Remove error for this field if any
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    const fieldsToValidate = [
      "imei",
      "deviceId",
      "deviceName",
      "cellType",
      "cellUsed",
      "cellBrand",
      "bmsName",
      "casingName",
      "capacity",
      "warranty",
      "subscriptionEnd",
      "sellingDate",
      "CustomerName",
    ];

    if (type) fieldsToValidate.push("customerType");

    fieldsToValidate.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const stringData = {};
      Object.keys(formData).forEach((key) => {
        stringData[key] = formData[key].toString();
      });
      onSubmit(stringData);
    }
  };

  const getInputClass = (field) =>
    `border p-2 w-full rounded-md text-sm bg-white ${errors[field] ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="p-6 w-full max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-center mb-5">Fill Details to add a Device</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Device IMEI */}
        <div>
          <input
            type="text"
            name="imei"
            value={formData.imei}
            onChange={handleChange}
            placeholder="Device IMEI no.*"
            className={getInputClass("imei")}
          />
          {errors.imei && <p className="text-red-500 text-xs mt-1">{errors.imei}</p>}
        </div>

        {/* Device Id */}
        <div>
          <input
            type="text"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            placeholder="Device Id*"
            className={getInputClass("deviceId")}
          />
          {errors.deviceId && <p className="text-red-500 text-xs mt-1">{errors.deviceId}</p>}
        </div>

        {/* Device Name */}
        <div>
          <input
            type="text"
            name="deviceName"
            value={formData.deviceName}
            onChange={handleChange}
            placeholder="Device Name*"
            className={getInputClass("deviceName")}
          />
          {errors.deviceName && <p className="text-red-500 text-xs mt-1">{errors.deviceName}</p>}
        </div>

        {/* Cell Type */}
        <div>
          <input
            type="text"
            name="cellType"
            value={formData.cellType}
            onChange={handleChange}
            placeholder="Cell Type"
            className={getInputClass("cellType")}
          />
          {errors.cellType && <p className="text-red-500 text-xs mt-1">{errors.cellType}</p>}
        </div>

        {/* Cell Used */}
        <div>
          <input
            type="text"
            name="cellUsed"
            value={formData.cellUsed}
            onChange={handleChange}
            placeholder="Cell Used"
            className={getInputClass("cellUsed")}
          />
          {errors.cellUsed && <p className="text-red-500 text-xs mt-1">{errors.cellUsed}</p>}
        </div>

        {/* Cell Brand */}
        <div>
          <input
            type="text"
            name="cellBrand"
            value={formData.cellBrand}
            onChange={handleChange}
            placeholder="Cell Brand"
            className={getInputClass("cellBrand")}
          />
          {errors.cellBrand && <p className="text-red-500 text-xs mt-1">{errors.cellBrand}</p>}
        </div>

        {/* BMS Used */}
        <div>
          <input
            type="text"
            name="bmsName"
            value={formData.bmsName}
            onChange={handleChange}
            placeholder="Bms Used"
            className={getInputClass("bmsName")}
          />
          {errors.bmsName && <p className="text-red-500 text-xs mt-1">{errors.bmsName}</p>}
        </div>

        {/* Casing */}
        <div>
          <input
            type="text"
            name="casingName"
            value={formData.casingName}
            onChange={handleChange}
            placeholder="Casing"
            className={getInputClass("casingName")}
          />
          {errors.casingName && <p className="text-red-500 text-xs mt-1">{errors.casingName}</p>}
        </div>

        {/* Capacity */}
        <div>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Cell mAh"
            className={getInputClass("capacity")}
          />
          {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
        </div>

        {/* Warranty */}
        <div>
          <select
            name="warranty"
            value={formData.warranty || ""}
            onChange={handleChange}
            className={getInputClass("warranty")}
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
          {errors.warranty && <p className="text-red-500 text-xs mt-1">{errors.warranty}</p>}
        </div>

        {/* Subscription End */}
        <div>
          <select
            name="subscriptionEnd"
            value={formData.subscriptionEnd || ""}
            onChange={handleChange}
            className={getInputClass("subscriptionEnd")}
          >
            <option value="" disabled>
              Subscription End In*
            </option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
          </select>
          {errors.subscriptionEnd && <p className="text-red-500 text-xs mt-1">{errors.subscriptionEnd}</p>}
        </div>

{/* Selling Date */}
<div className="flex flex-col w-full">
  <div className="flex items-center justify-between border border-gray-300 rounded-md p-2 bg-white">
    <label className="text-gray-400 text-[13px]">Select selling date</label>
    <input
      type="date"
      name="sellingDate"
      value={formData.sellingDate}
      onChange={handleChange}
      className="text-sm bg-white outline-none w-40" // Keep design intact
    />
  </div>
  {errors.sellingDate && <p className="text-red-500 text-xs mt-1">{errors.sellingDate}</p>}
</div>

        {/* Customer Type */}
        {type && (
          <div>
            <select
              name="customerType"
              value={formData.customerType || ""}
              onChange={handleChange}
              className={getInputClass("customerType")}
            >
              <option value="" disabled>
                Customer Type*
              </option>
              <option value="Dealer">Dealer</option>
              <option value="Customer">Customer</option>
            </select>
            {errors.customerType && <p className="text-red-500 text-xs mt-1">{errors.customerType}</p>}
          </div>
        )}

        {/* Customer Name */}
        <div>
          <select
            name="CustomerName"
            value={formData.CustomerName}
            onChange={handleChange}
            className={getInputClass("CustomerName")}
          >
            <option value="" disabled>
              Customer Name
            </option>
            {Customer.map((value) =>
              type ? (
                <option key={value.customerId} value={value.customerId}>
                  {value.name}
                </option>
              ) : (
                <option key={value.customerId} value={value.customerId}>
                  {value.customerName}
                </option>
              )
            )}
          </select>
          {errors.CustomerName && <p className="text-red-500 text-xs mt-1">{errors.CustomerName}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          className="w-1/2 border border-red-300 bg-red-300 hover:bg-white px-6 py-3 rounded-md text-sm font-medium"
          onClick={() => {
            setShowForm(false);
            setFormData({
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
              subscriptionEnd: "",
              sellingDate: "",
              customerType: "",
              DealerName: "",
              CustomerName: "",
            });
            setErrors({});
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="w-1/2 border border-green-300 bg-[#019D6D] hover:bg-white px-6 py-3 rounded-md text-sm font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DeviceDetailsForm;
