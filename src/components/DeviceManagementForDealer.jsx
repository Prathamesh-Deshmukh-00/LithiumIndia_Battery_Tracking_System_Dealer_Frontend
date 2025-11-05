import { useState, useEffect } from "react";
import { Search, Calendar, Edit } from "lucide-react";
import { Toggle } from "./index.js";
import { ToastContainer, toast, Slide } from "react-toastify";
import {
  DeviceDetailsForm2,
  UpdateDeviceDetailsForm,
  Loading,
} from "./index.js"; // Capitalized
import {
  addDeviceDealer,
  blockDevice,
  getAllDealerDevices,
  getDeviceByDeviceId,
  updateDealerDevice,
} from "../API/DEALERSIDE_API/Api.js";

const DeviceManagementForDealer = ({ setDevice, setDevicedetailsdata }) => {
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [toggleStates, setToggleStates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [tabledata, setTabledata] = useState({});
  const [paginationTotal, setPaginationTotal] = useState(1);
  const [selected, setselected] = useState(1);
  const [dataId, setdataId] = useState(null);
  const [searchId, setSearchId] = useState(false);
  const [devicedataById, setdevicedataById] = useState({});
  const [singletoggleStatus, setsingletoggleStatus] = useState(false);
  const [updateDevice, setUpdateDevice] = useState(false);
  const [updateDeviceStatus, setUpdateDeviceStatus] = useState(false);
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
    subscriptionEnd: "",
    sellingDate: "",
    customerType: "",
    DealerName: "",
    CustomerName: "",
  });

  useEffect(() => {
    setsingletoggleStatus(
      Object.keys(devicedataById).length !== 0 ? devicedataById.isBlocked : null
    );
  }, [devicedataById]);

  const isToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  async function abc() {
    console.log("search term:- ", searchTerm);
    const data = await getDeviceByDeviceId(searchTerm);
    if (data?.deviceId) {
      console.log("Device id data is :- ", data);
      setSearchId(true);
      setdevicedataById(data);
    } else {
      toast.error(data.message);
    }
    console.log("response come from backend for id ", data);
  }

  const isYesterday = (dateStr) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const date = new Date(dateStr);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  useEffect(() => {
    if (tabledata && Object.keys(tabledata).length > 0) {
      const status = tabledata.map((device, index) => {
        return {
          index: index,
          statusdata: device.isBlocked,
        };
      });
      setToggleStates(status);
    }
  }, [tabledata]);

  const handleTabClick = (label) => {
    setActiveTab(label);
    if (label === "Today") {
      setSelectedDate(new Date().toISOString().split("T")[0]);
    } else if (label === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setSelectedDate(yesterday.toISOString().split("T")[0]);
    }
  };

  const handleFormSubmit = () => {
    const token = localStorage.getItem("accessToken");
    console.log("DEVICE INFO :-", deviceInfo);
    addDeviceDealer(deviceInfo, token)
      .then((data) => {
        if (data.status == 201) {
          // console.log("Device added successfully",data);
          toast.success("Device added successfully");
        } else {
          toast.error("Some error occurs while creating user please try again");
          // console.log("error occurs while adding device is :-", data);
        }
      })
      .catch((error) => {
        toast.error("error occurs while adding device  ", error);
        // console.log("error occurs while adding device  :-", error);
      });
    // console.log("Form Data Submitted:", formData);
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
    setShowForm(false);
  };

  const [formData2, setFormData2] = useState({
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
  });

  const deviceInfo =
    formData.customerType == "Dealer"
      ? {
          imei: formData.imei, // changed to a unique IMEI
          deviceId: formData.deviceId, // unique device ID
          deviceName: formData.deviceName,
          cellType: formData.cellBrand,
          cellUsed: formData.cellUsed,
          cellBrand: formData.cellBrand,
          bmsUsed: formData.bmsName,
          casing: formData.casingName,
          cellmAH: formData.capacity,
          warranty: formData.warranty,
          saleDate: formData.sellingDate,
          subscriptionEndIn: formData.subscriptionEnd,
          dealerId: formData.DealerName, // only dealerId or customerId should be here
        }
      : {
          imei: formData.imei, // changed to a unique IMEI
          deviceId: formData.deviceId, // unique device ID
          deviceName: formData.deviceName,
          cellType: formData.cellBrand,
          cellUsed: formData.cellUsed,
          cellBrand: formData.cellBrand,
          bmsUsed: formData.bmsName,
          casing: formData.casingName,
          cellmAH: formData.capacity,
          warranty: formData.warranty,
          saleDate: formData.sellingDate,
          subscriptionEndIn: formData.subscriptionEnd,
          customerId: formData.CustomerName,
        };

  const deviceInfo2 = {
    imei: formData2.imei,
    deviceId: formData2.deviceId,
    deviceName: formData2.deviceName,
    cellType: formData2.cellType,
    cellUsed: formData2.cellUsed,
    cellBrand: formData2.cellBrand,
    bmsUsed: formData2.bmsName,
    casing: formData2.casingName,
    cellmAH: formData2.capacity,
    warranty: formData2.warranty,
  };

  const handleFormSubmit2 = () => {
    // console.log("id is :-",tabledata.data._id);
    updateDealerDevice(deviceInfo2, dataId)
      .then((data) => {
        if (data.status == 200) {
          // console.log("Device Updated successfully",data);
          if (searchId) {
            setSearchTerm(deviceInfo2.deviceId);
            (async function () {
              const data = await getDeviceByDeviceId(deviceInfo2.deviceId);
              if (data?.deviceId) {
                setdevicedataById(data);
              } else {
                toast.error(data.message);
              }
            })();
          } else {
            setUpdateDevice(true);
          }
          toast.success("Device Updated successfully");
        } else {
          toast.error(
            "Some error occurs while Updateing user please try again"
          );
          // console.log("error occurs while Updating device is :-", data);
        }
      })
      .catch((error) => {
        toast.error("error occurs while Updating device  ", error);
        // console.log("error occurs while Updating device  :-", error);
      });
    console.log("Form Data Submitted:", formData2);
    setFormData2({
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
    });

    setShowForm2(false);
  };

  // const handleToggle = (index) => {
  //   setToggleStates((prevStates) =>
  //     prevStates.map((state, i) => (i === index ? !state : state))
  //   );
  // };

  // const deviceData =  tabledata;

  // console.log("table data in device data form ",deviceData)
  // Array(8).fill({
  //     imei: "123456789876543",
  //     deviceId: "abcd1234",
  //     deviceName: "Battery Name",
  //     customerName: "Customer Name",
  //     contact: "+91 98XXXXXXXX",
  //     saleDate: "21/04/24",
  //     subscription: "2 Years",
  //     warranty: "2 Years",
  //   });
  useEffect(() => {
    setselected(1);
  }, [selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      setTabledata({});
      console.log("selected date before hit api", selectedDate.toString());
      const sample = await getAllDealerDevices(selectedDate, selected);
      if (!sample.data.data.length) {
        console.log("table data set null");
        setTabledata(null);
      } else {
        setTabledata(sample.data.data);
        setPaginationTotal(sample.data.pagination.totalPages);
        console.log("all devices data :- ", sample.data);
      }
    };
    fetchData();
    setUpdateDevice(false);
  }, [selectedDate, updateDevice, selected]);

  //  console.log("selected page is :-",selected," and total pages is :- ",paginationTotal);

  return (
    <div className="p-6 bg-green-50  min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Device Management</h2>

      {/* Search & Actions */}
      <div className="flex justify-between flex-wrap gap-3 bg-white p-4 rounded-lg mb-4">
        <div className="flex flex-wrap gap-3 w-full sm:w-auto items-center">
          <div className="flex items-center bg-green-100 p-2 px-4 rounded-full w-full sm:w-[350px]">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by device id"
              className="bg-transparent outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchTerm != "") {
                    abc();
                  }
                }
              }}
            />
            <button
              className="text-sm rounded-full hover:bg-green-300 bg-white px-3 py-1"
              onClick={() => {
                console.log("button is clicked");
                if (searchTerm != "") {
                  abc();
                }
              }}
            >
              search
            </button>
          </div>

          <button
            className="bg-[#019D6D] text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => setShowForm(true)}
          >
            + Add Device
          </button>
        </div>

        {!searchId ? (
          <div className="flex items-center gap-2">
            {/* Display "Today" and "Yesterday" Buttons Always Initially, Hide If Custom Date Selected */}
            {
              <div className="flex bg-white rounded-lg overflow-hidden">
                {["Today", "Yesterday"].map((label) => (
                  <button
                    key={label}
                    onClick={() => handleTabClick(label)}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === label
                        ? "bg-[#019D6D] text-white"
                        : "text-gray-500 border border-gray-400 hover:bg-green-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            }

            {/* Date Picker */}
            <input
              type="date"
              className="px-4 py-2 rounded-md border"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setActiveTab(""); // Clear activeTab when selecting a custom date
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <div className="min-w-[1400px]">
          {/* Table Header */}
          <div className="bg-white p-3 rounded-t-xl mb-1">
            <div className="grid grid-cols-[repeat(9,minmax(0,1fr))_auto] gap-6 bg-green-100 rounded-xl text-black h-10 items-center text-sm font- px-2 text-center whitespace-nowrap">
              <div>IMEI No.</div>
              <div>Device Id</div>
              <div>Device Name</div>
              <div>Customer Name</div>
              <div>Contact No.</div>
              <div>Sale Date</div>
              <div>Subscription End In</div>
              <div>Warranty</div>
              <div>Action</div>
            </div>
          </div>
          {/* {console.log("device id is :- ", devicedataById)} */}
          {Object.keys(devicedataById).length !== 0 ? (
            <div className="bg-white rounded-b-xl divide-y">
              {
                <div
                  className={`grid grid-cols-[repeat(9,minmax(0,1fr))_auto] gap-6 px-2 py-3  border-none text-sm items-center ${
                    singletoggleStatus ? "text-gray-500" : "text-black"
                  } hover:bg-gray-50 transition text-center`}
                >
                  <div
                    onClick={() => {
                      setDevice(false);
                      setDevicedetailsdata(devicedataById);
                    }}
                    className="px-5 py-2 mr-8 mb-1 flex items-center justify-center 
             rounded-lg border border-emerald-600 text-emerald-700 
             hover:bg-emerald-700 hover:text-white transition-colors 
             duration-200 cursor-pointer shadow-sm 
             max-w-[200px] truncate"
                    title={devicedataById.imei} // tooltip shows full IMEI
                  >
                    {devicedataById.imei}
                  </div>

                  <div className="break-words">{devicedataById.deviceId}</div>
                  <div className="break-words">{devicedataById.deviceName}</div>
                  <div className="break-words">
                    {devicedataById.customerName
                      ? devicedataById.customerName
                      : devicedataById.dealerName}
                  </div>
                  <div className="break-words">
                    {devicedataById.customerPhone
                      ? devicedataById.customerPhone
                      : devicedataById.dealerPhone}
                  </div>
                  <div className="break-words">
                    {devicedataById.saleDate?.slice(0, 10)}
                  </div>
                  <div className="break-words">
                    {devicedataById.subscriptionEndIn}
                  </div>
                  <div className="break-words">{devicedataById.warranty}</div>
                  <div className="flex justify-center gap-2 items-center">
                    <Toggle
                      value={singletoggleStatus}
                      onClick={() => {
                        async function testing() {
                          const response = await blockDevice(
                            devicedataById._id,
                            !singletoggleStatus
                          );

                          if (
                            response == "Device successfully blocked" ||
                            response == "Device successfully unblocked"
                          ) {
                            // console.log("if called in blocaking ,",response);
                            setsingletoggleStatus(!singletoggleStatus);
                          } else {
                            toast.error(
                              "Some error occurs while doing process please try again some time.."
                            );
                          }
                        }

                        testing();
                      }}
                    />
                    <button
                      className="p-1 hover:bg-green-200 rounded"
                      onClick={() => {
                        setdataId(devicedataById._id);
                        const data = {
                          imei: devicedataById.imei,
                          deviceId: devicedataById.deviceId,
                          deviceName: devicedataById.deviceName,
                          cellType: devicedataById.batteryDetails.cellType,
                          cellUsed: devicedataById.batteryDetails.cellUsed,
                          cellBrand: devicedataById.batteryDetails.cellBrand,
                          bmsName: devicedataById.batteryDetails.bms_model,
                          casingName: devicedataById.batteryDetails.casing,
                          capacity: devicedataById.batteryDetails.capacity_mAh,
                          warranty: devicedataById.warranty,
                          subscriptionEnd: devicedataById.subscriptionEndIn,
                          sellingDate: devicedataById.saleDate?.slice(0, 10),
                        };
                        setShowForm2(true);
                        setFormData2(data);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              }
            </div>
          ) : (!tabledata || Object.keys(tabledata).length === 0) &&
            tabledata != null ? (
            <div className="flex justify-center items-center text-gray-500 text-lg font-semibold">
              <Loading />
            </div>
          ) : tabledata == null ? (
            <div className="flex justify-center items-center h-80 text-red-400 text-lg font-semibold">
              No data found
            </div>
          ) : (
            <div className="bg-white rounded-b-xl divide-y">
              {tabledata.map((device, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[repeat(9,minmax(0,1fr))_auto] gap-6 px-2 py-3 border-none text-sm ${
                    toggleStates?.[index]?.statusdata === true
                      ? "text-gray-500"
                      : "text-black"
                  } items-center hover:bg-gray-50 transition text-center`}
                >
                  <div
                    onClick={() => {
                      setDevice(false);
                      setDevicedetailsdata(tabledata[index]);
                    }}
               className="px-5 py-2  mb-1 flex items-center justify-center 
             rounded-lg border border-emerald-600 text-sm text-emerald-700
             hover:bg-emerald-700 hover:text-white transition-colors 
             duration-200 cursor-pointer shadow-sm 
             max-w-[200px] truncate"
                    title={device.imei} // tooltip shows full IMEI
                  >
                    {device.imei}
                  </div>
                  <div className="break-words">{device.deviceId}</div>
                  <div className="break-words">{device.deviceName}</div>
                  <div className="break-words">
                    {device.customerName
                      ? device.customerName
                      : device.dealerName}
                  </div>
                  <div className="break-words">
                    {device.customerPhone
                      ? device.customerPhone
                      : device.dealerPhone}
                  </div>
                  <div className="break-words">
                    {device.saleDate?.slice(0, 10)}
                  </div>
                  <div className="break-words">{device.subscriptionEndIn}</div>
                  <div className="break-words">{device.warranty}</div>
                  <div className="flex justify-center gap-2 items-center">
                    <Toggle
                      value={
                        toggleStates.find((item) => item.index === index)
                          ?.statusdata || false
                      }
                      onClick={() => {
                        async function testing() {
                          const blogstatusdata = toggleStates.find(
                            (item) => item.index === index
                          );
                          // console.log("blog current data :-",blogstatusdata.statusdata);
                          const response = await blockDevice(
                            device._id,
                            !blogstatusdata.statusdata
                          );
                          // console.log("block value response is :-",response);
                          if (
                            response == "Device successfully blocked" ||
                            response == "Device successfully unblocked"
                          ) {
                            // console.log("if called in blocaking ,",response);
                            setToggleStates((prevStates) =>
                              prevStates.map((item) =>
                                item.index === index
                                  ? { ...item, statusdata: !item.statusdata }
                                  : item
                              )
                            );
                          } else {
                            toast.error(
                              "Some error occurs while blocking device please try again some time.."
                            );
                          }
                        }

                        testing();
                      }}
                    />
                    <button
                      className="p-1 hover:bg-gray-200 rounded"
                      onClick={() => {
                        setdataId(tabledata[index]._id);
                        const data = {
                          imei: device.imei,
                          deviceId: device.deviceId,
                          deviceName: device.deviceName,
                          cellType: device.batteryDetails.cellType,
                          cellUsed: device.batteryDetails.cellUsed,
                          cellBrand: device.batteryDetails.cellBrand,
                          bmsName: device.batteryDetails.bms_model,
                          casingName: device.batteryDetails.casing,
                          capacity: device.batteryDetails.capacity_mAh,
                          warranty: device.warranty,
                          subscriptionEnd: device.subscriptionEndIn,
                          sellingDate: device.saleDate?.slice(0, 10),
                        };
                        setShowForm2(true);
                        setFormData2(data);
                      }}
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!searchId && tabledata && tabledata.length > 0 ? (
        <div className="justify-center mt-5 align-center flex flex-row">
          <button
            className="mr-5 text-sm border px-2 w-25 py-2 bg-green-400 hover:bg-[#019D6D] rounded-full"
            onClick={() => {
              if (selected > 1) setselected(selected - 1);
            }}
          >
            Previous
          </button>

          <div className="flex items-center">
            {Array.from({ length: paginationTotal }, (_, i) => (
              <div
                className={`px-4 py-2 hover:bg-green-400 rounded-full ${
                  selected === i + 1
                    ? "font-bold text-lg"
                    : "font-light text-sm"
                }`}
                key={i + 1}
                onClick={() => {
                  setselected(i + 1);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <button
            className="text-sm border px-2 w-25 py-2 bg-green-400 hover:bg-[#019D6D] rounded-full"
            onClick={() => {
              if (selected < paginationTotal) setselected(selected + 1);
            }}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Popup Modals */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative border border-gray-300">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <DeviceDetailsForm2
              formData={formData}
              setFormData={setFormData}
              setShowForm={setShowForm}
              onSubmit={handleFormSubmit}
              type={false}
            />
          </div>
        </div>
      )}

      {showForm2 && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative border border-gray-300">
            <button
              onClick={() => setShowForm2(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <UpdateDeviceDetailsForm
              formData2={formData2}
              setformData2={setFormData2}
              setShowForm2={setShowForm2}
              onSubmit2={handleFormSubmit2}
            />
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastStyle={{ fontSize: "18px", textAlign: "center" }}
        className="custom-toast-container"
      />
    </div>
  );
};

export default DeviceManagementForDealer;
