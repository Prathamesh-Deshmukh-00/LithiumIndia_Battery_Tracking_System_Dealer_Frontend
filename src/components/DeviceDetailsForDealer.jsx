import { ChevronLeft, UserRound, Phone } from "lucide-react";
import { useState } from "react";
import Toggle from "./Toggle.jsx";
import batterychargin from "../Images/batterychargin.png";
import Battery from "../Images/Battery.png";
import { DeviceDetailsForm, SOH } from "./index.js";
import { addMonths, format } from "date-fns";

const DeviceDetailsForDealer = ({ setDevice, devicedetailsdata }) => {
  console.log("device data ", devicedetailsdata);
  const [isToggledCharging, setIsToggledCharging] = useState(false);
  const [isToggledBattery, setIsToggledBattery] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleFormSubmit = () => {
    console.log("Form Submitted:", formData);
    setShowForm(false); // Close popup after submit
  };

  const saleDate = new Date(devicedetailsdata.saleDate);

  const formattedSaleDate = saleDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "/"); // replace spaces with '/'

  return (
    <div className="w-full bg-green-50 max-w-8xl p-4 relative">
      <div className="flex items-center w-full mb-4">
        <ChevronLeft
          className="h-10 w-10 cursor-pointer"
          onClick={() => {
            setDevice(true);
          }}
        />
        <p className="font-semibold text-xl ml-2">Device Details</p>
      </div>

      <div className="bg-white rounded-lg p-4 flex flex-wrap lg:flex-nowrap justify-between shadow-md">
        <img src={SOH} className="h-40 w-40 rounded" alt="unknown" />

        <div className="flex flex-col space-y-2 ml-5 w-full max-w-xs text-sm">
          <div className="bg-green-100 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <UserRound />
              <p className="ml-2">
                {devicedetailsdata.dealerName
                  ? devicedetailsdata.dealerName
                  : devicedetailsdata.customerName}
              </p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <p>
                {devicedetailsdata.dealerPhone
                  ? devicedetailsdata.dealerPhone
                  : devicedetailsdata.customerPhone}
              </p>
            </div>
          </div>
          <p className="bg-green-100 rounded-2xl p-2 text-center">
            Subscription End on{" "}
            {format(
              addMonths(new Date(), devicedetailsdata.subscriptionEndIn || 0),
              "dd/MMM/yyyy"
            )}
          </p>
        </div>

        <div className="w-full max-w-xs ml-5 space-y-2 text-sm">
          {[
            ["IMEI No.", devicedetailsdata.imei],
            ["Device Id", devicedetailsdata.deviceId],
            ["Device Name", devicedetailsdata.deviceName],
            ["Selling Date", formattedSaleDate],
            ["Warranty", `${devicedetailsdata.warranty} year`],
          ].map(([label, value]) => (
            <div key={label} className="flex">
              <p className="w-28 text-start">{label}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:space-x-3 w-full text-sm space-y-3 md:space-y-0">
          {[
            {
              label: "Battery Charging",
              img: batterychargin,
              toggled: isToggledCharging,
              setToggle: setIsToggledCharging,
            },
            {
              label: "Battery Discharging",
              img: Battery,
              toggled: isToggledBattery,
              setToggle: setIsToggledBattery,
            },
          ].map(({ label, img, toggled, setToggle }) => (
            <div
              key={label}
              className="flex flex-row items-center justify-center bg-green-100 p-4 rounded-xl flex-1 min-w-[150px]"
            >
              <div className="flex flex-col items-center mr-4">
                <p className="text-center">{label}</p>
                <div className="p-2">
                  <Toggle
                    value={toggled}
                    onClick={() => setToggle((prev) => !prev)}
                  />
                </div>
              </div>
              <img
                src={img}
                alt={label}
                className="
    h-12 w-12 
    max-[1295px]:max-w-[40px] 
    max-[1295px]:max-h-[40px] 
    min-[1040px]:max-w-[40px] 
    min-[1040px]:max-h-[40px]
  "
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white p-4 rounded-lg shadow-md mt-4 text-sm">
        {[
          {
            label: "Cell Used",
            value: devicedetailsdata.batteryDetails.cellUsed,
          },
          {
            label: "Cell Type",
            value: devicedetailsdata.batteryDetails.cellType,
          },
          {
            label: "BMS Used",
            value: devicedetailsdata.batteryDetails.bms_model,
          },
          {
            label: "Cell Brand",
            value: devicedetailsdata.batteryDetails.cellBrand,
          },
          {
            label: "Cell mAh",
            value: devicedetailsdata.batteryDetails.capacity_mAh,
          },
          { label: "Casing", value: devicedetailsdata.batteryDetails.casing },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col justify-center items-center min-h-12 bg-green-200 rounded-lg p-2 w-full text-center"
          >
            <p className="font-semibold">{item.label}</p>
            <p className="break-words whitespace-pre-wrap">{item.value}</p>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-4">
        <p
          className="p-2 bg-white w-50 h-auto text-center rounded-lg shadow-md cursor-pointer text-sm"
          onClick={() => setShowForm(true)}
        >
          + Add Device Details
        </p>
      </div> */}

      {/* Popup Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40  flex items-center justify-center">
          <div className="bg-white rounded-lg  w-full max-w-2xl shadow-lg relative border border-gray-300">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <DeviceDetailsForm
              formData={formData}
              setFormData={setFormData}
              setShowForm={setShowForm}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetailsForDealer;
