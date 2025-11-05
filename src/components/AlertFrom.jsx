const AlertForm = ({
  onClose,
  onSubmit,
  setFormData,
  formData,
  setShowForm,
  type
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-xl mx-auto p-6 relative">
      {/* Close Icon inside form top-right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl font-semibold text-gray-700 hover:text-black"
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-center mb-6">Alerts</h2>


      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {
          type != "Dealer" ? <input
          type="text"
          placeholder="Alert Name"
          onChange={handleChange}
          value={formData.AlertName || ""}
          name="AlertName"
          className="border border-gray-300 rounded-md px-4 py-2 outline-none"
        /> : ""
        }
      
        <input
          type="text"
          placeholder="Unit"
          onChange={handleChange}
          value={formData.unit || ""}
          name="unit"
          className="border border-gray-300 rounded-md px-4 py-2 outline-none"
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.UnitpperValue || ""}
          name="UnitpperValue"
          placeholder="Set upper value"
          className="border border-gray-300 rounded-md px-4 py-2 outline-none"
        />
        <input
          type="text"
          onChange={handleChange}
          value={formData.LowerValue || ""}
          name="LowerValue"
          placeholder="Set lower value"
          className="border border-gray-300 rounded-md px-4 py-2 outline-none"
        />

          {
          type != "Dealer" ? <input
          type="text"
          onChange={handleChange}
          value={formData.deviceId || ""}
          name="deviceId"
          placeholder="Enter device ID to add alert"
          className="border border-gray-300 rounded-md px-4 py-2 outline-none sm:col-span-2"
        />  : ""
        }
        
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100"
          onClick={() => {
            setFormData({
    AlertName: "",
    unit: "",
    UnitpperValue: "",
    LowerValue: "",
    deviceId: "",
  });
            setShowForm(false);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-gray-500"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AlertForm;
