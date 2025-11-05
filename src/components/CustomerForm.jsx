import { useState } from "react";

const CustomerForm = ({
  formData,
  setFormData,
  onSubmit,
  setShowForm,
  CustomerDetails,
  formType,
}) => {
  const [errors, setErrors] = useState({});

  // validate individual field
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "customerName":
        if (!value) message = "Customer name is required";
        break;
      case "email":
        if (!value) message = "Email Id is required";
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) message = "Invalid";
        }
        break;
      case "contactNumber":
        if (!value) message = "Contact number is required";
        else if (value.length < 10) message = "10 digits";
        break;
      case "addressState":
        if (!value) message = "State Address is required";
        break;
      case "addressCity":
        if (!value) message = "City Address is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error while typing
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center mb-4">
        {CustomerDetails == "Dealer" && formType == "Add"
          ? "Fill Details to add a Dealer"
          : CustomerDetails == "Dealer" && formType == "Update"
          ? "Edit Details of the Dealer"
          : CustomerDetails == "Customer" && formType == "Add"
          ? " Fill Details to add a Customer"
          : "Edit Details of the Customer"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Customer Name */}
        <div>
          <input
            type="text"
            name="customerName"
            value={formData.customerName || ""}
            onChange={handleChange}
            onBlur={(e) => validateField("customerName", e.target.value)}
            placeholder={
              CustomerDetails == "Dealer"
                ? "Enter Dealer Name..."
                : "Enter Customer Name..."
            }
            className="border border-gray-300 p-2 w-full rounded-md text-sm bg-white"
          />
          {errors.customerName && (
            <p className="text-red-500 text-xs">{errors.customerName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={(e) => validateField("email", e.target.value)}
            placeholder="Email Id"
            className="border p-2 w-full rounded-md text-sm bg-white border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber || ""}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              if (input.length <= 10) {
                setFormData({ ...formData, contactNumber: input });
              }
              setErrors({ ...errors, contactNumber: "" });
            }}
            onBlur={(e) => validateField("contactNumber", e.target.value)}
            placeholder="Contact Number"
            maxLength={10}
            className="border p-2 w-full rounded-md text-sm bg-white border-gray-300"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs">{errors.contactNumber}</p>
          )}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            name="addressState"
            value={formData.addressState || ""}
            onChange={handleChange}
            onBlur={(e) => validateField("addressState", e.target.value)}
            placeholder="Address 2 (State)"
            className="border border-gray-300 p-2 w-full rounded-md text-sm bg-white"
          />
          {errors.addressState && (
            <p className="text-red-500 text-xs">{errors.addressState}</p>
          )}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="addressCity"
            value={formData.addressCity || ""}
            onChange={handleChange}
            onBlur={(e) => validateField("addressCity", e.target.value)}
            placeholder="Address 1 (City Name)"
            className="border border-gray-300 p-2 w-full rounded-md text-sm bg-white"
          />
          {errors.addressCity && (
            <p className="text-red-500 text-xs">{errors.addressCity}</p>
          )}
        </div>

        {/* Company Name (Only if not Customer+Update) */}
        {!(CustomerDetails === "Customer" && formType === "Update") && (
          <div>
            <input
              type="text"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleChange}
              onBlur={(e) => validateField("companyName", e.target.value)}
              placeholder="Enter Name of your company"
              className="border border-gray-300 p-2 w-full rounded-md text-sm bg-white"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs">{errors.companyName}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="border border-gray-400 bg-red-400 text-black px-4 py-2 w-1/2 rounded-md text-sm font-medium hover:bg-red-200 mr-2"
          onClick={() => {
            setFormData({
              customerName: "",
              email: "",
              contactNumber: "",
              addressState: "",
              addressCity: "",
              companyName: "",
            });
            setShowForm(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="border border-gray-400 bg-[#019D6D] text-white px-4 py-2 w-1/2 rounded-md text-sm font-medium hover:bg-[#7ee4c5]  ml-2"
        >
          {formType == "Add" ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
