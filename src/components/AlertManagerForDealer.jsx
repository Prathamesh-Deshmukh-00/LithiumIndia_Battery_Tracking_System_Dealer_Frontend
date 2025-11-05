import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaTrashAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { Pencil, ChevronDown } from "lucide-react";
import AlertForm from "./AlertFrom";
import { ToastContainer, toast, Slide } from "react-toastify";

// import API's
import {
  addAlert,
  deleteAlert,
  deleteAlertSetting,
  getAlertsByDeviceId,
  getAlertSettingsByName,
  getAllAlerts,
  getAllAlertSettings,
  updateAlertSetting,
} from "../API/DEALERSIDE_API/Api.js";

const AlertManagerForDealer = () => {
  const [selectedTab, setSelectedTab] = useState("Alerts");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [searchId, setSearchId] = useState(false);
  const [searchAlert, setSearchAlert] = useState([]);
  const [selected, setselected] = useState(1);
  const [getAllAlertData, setGetAllAlertData] = useState([]);
  const [alertFoundStatus, setAlertFoundStatus] = useState("false");
  const [paginationTotal, setPaginationTotal] = useState(1);

  const [SearchSettingTerm, setSearchSettingTerm] = useState("");
  const [SearchSettingAlert, setSearchSettingAlert] = useState("");
  const [alertSettingItems, setAlertSettingItems] = useState([]);
  const [alertIdforUpdate, setAlertIdforUpdate] = useState("");

  const [formData, setFormData] = useState({
    AlertName: "",
    unit: "",
    UnitpperValue: "",
    LowerValue: "",
    deviceId: "",
  });
  const [formData2, setFormData2] = useState({
    AlertName: "",
    unit: "",
    UnitpperValue: "",
    LowerValue: "",
    deviceId: "",
  });

  useEffect(() => {
    setAlertFoundStatus("Loading");
    getAllAlerts({
      date: selectedDate,
      alertName: selectedFilter,
      page: selected,
      limit: 7,
    }).then((alerts) => {
      if (alerts) {
        if (alerts.data.length == 0) {
          console.log("i am called in set alert null 1");
          setGetAllAlertData(null);
          setAlertFoundStatus("false");
          setPaginationTotal(0);
        } else {
          setGetAllAlertData(alerts.data);
          setAlertFoundStatus("true");
          setPaginationTotal(alerts.total ? Math.ceil(alerts.total / 7) : 1);
          console.log("Alerts:", alerts);
        }
      }
    });
  }, [selectedDate, selected, selectedFilter]);

  useEffect(() => {
    getAllAlertSettings().then((alerts) => {
      if (alerts) {
        setAlertSettingItems(alerts);
      }
    });
  }, []);

  useEffect(() => {
    setselected(1);
  }, [selectedDate, selectedFilter]);

  const alertFilters = ["SOC", "Temperature"];

  function handleSubmit() {
    console.log("form data is :- ", formData);
    const alertData = {
      deviceId: formData.deviceId,
      alertName: formData.AlertName,
      upperValue: formData.UnitpperValue,
      lowerValue: formData.LowerValue,
      unit: formData.unit,
      action: "Shutdown",
    };
    async function test() {
      const response = await addAlert(alertData);
      if (response && response.status == 201) {
        toast.success("Data Added Succussfully");
      } else {
        toast.error(response.message);
      }
    }
    test();

    setFormData({
      AlertName: "",
      unit: "",
      UnitpperValue: "",
      LowerValue: "",
    });
    setShowForm(false);
  }

  function handleSubmit2() {
    console.log("form2 data is :- ", formData2);
    const alertData = {
      id: alertIdforUpdate,
      deviceId: formData2.deviceId,
      alertName: formData2.AlertName,
      upperValue: formData2.UnitpperValue,
      lowerValue: formData2.LowerValue,
      unit: formData2.unit,
    };

    updateAlertSetting(alertData)
      .then((res) => {
        if (SearchSettingTerm != "") {
          setSearchSettingAlert([]);
          getAlertSettingsByName(SearchSettingTerm).then((alerts) => {
            if (alerts) {
              setSearchSettingAlert(alerts);
              console.log("setting alert is :- ", alerts);
            }
          });
        } else {
          getAllAlertSettings().then((alerts) => {
            if (alerts) {
              setAlertSettingItems(alerts);
            }
          });
        }

        setFormData({
          AlertName: "",
          unit: "",
          UnitpperValue: "",
          LowerValue: "",
          deviceId: "",
        });
        toast.success("Device Succussfully updated ", res);
        setShowForm2(false);
      })
      .catch((err) => {
        toast.error("Some error occurs while updating device error is ", err);
      });
  }

  async function abc() {
    const response = await getAllAlertData.filter(
      (data) => data.deviceId == searchTerm.trim()
    );
    if (searchTerm.trim() != "" && response.length != 0) {
      setSearchAlert([]);
      getAlertsByDeviceId(searchTerm.trim()).then((alerts) => {
        if (alerts) {
          setSearchId(true);
          if (alerts.length == 0) {
            setSearchAlert(null);
          }
          setSearchAlert(alerts);
        } else {
          toast.warn("No alert found for this device ");
        }
      });
    } else {
      toast.warn("Device id not found or No data present for this device id ");
    }
  }

  function SearchAlertByName() {
    console.log("button is clicked");
    if (SearchSettingTerm != "") {
      setSearchSettingAlert([]);
      getAlertSettingsByName(SearchSettingTerm).then((alerts) => {
        if (alerts) {
          setSearchSettingAlert(alerts);
          console.log("setting alert is :- ", alerts);
        }
      });
    }
  }

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

  return (
    <div className="p-6 bg-green-50 min-h-screen font-sans">
      <h1 className="text-2xl font-semibold mb-6">Alert Manager</h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-6">
        {["Alerts", "Added Alerts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`py-2 px-1 border-b-2 transition-colors duration-300 ${
              selectedTab === tab
                ? "border-black text-black font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters & Search */}
      <div
        className={`flex flex-wrap bg-white p-3 ${
          selectedTab == "Alerts" ? "justify-between" : ""
        } rounded items-center gap-4 mb-6`}
      >
        {selectedTab == "Alerts" ? (
          <div className="flex items-center bg-green-100 px-4 py-2 rounded-full shadow w-80">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alert by device id"
              className="outline-none w-full text-sm"
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
                // console.log("alert data is ",getAllAlertData)
                abc();
              }}
            >
              search
            </button>
          </div>
        ) : (
          <div className="flex items-center bg-green-100 px-4 py-2 rounded-full shadow w-80">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={SearchSettingTerm}
              onChange={(e) => setSearchSettingTerm(e.target.value)}
              placeholder="Search alert by Alert name "
              className="outline-none w-full text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  SearchAlertByName();
                }
              }}
            />
            <button
              className="text-sm rounded-full hover:bg-green-300 bg-white px-3 py-1"
              onClick={() => {
                SearchAlertByName();
              }}
            >
              search
            </button>
          </div>
        )}

        {selectedTab != "Alerts" ? (
          <button
            className="bg-[#019D6D]  text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => setShowForm(true)}
          >
            + Add Alert
          </button>
        ) : (
          ""
        )}

        {selectedTab == "Alerts" && !searchId ? (
          <div className="flex items-center gap-2">
            <div className="flex bg-white rounded-lg overflow-hidden">
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
            </div>

            <div className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg border border-gray-300">
              <LuCalendarDays size={16} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setActiveTab("");
                }}
                className="text-sm bg-transparent outline-none"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-white px-4 py-2 border rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <FaFilter />
                Filter by
                <ChevronDown size={16} />
              </button>
              {filterOpen && (
                <div className="absolute top-full mt-2 bg-white shadow-lg border rounded-md w-52 z-10 max-h-60 overflow-y-auto">
                  {alertFilters.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedFilter(item);
                        setFilterOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedFilter && (
              <button
                onClick={() => setSelectedFilter(null)}
                className="bg-gray-100 text-sm px-3 py-1 rounded-full border"
              >
                Clear Filter: {selectedFilter}
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Table */}
      {selectedTab == "Alerts" ? (
        <div className="bg-white shadow rounded-b-lg overflow-x-auto">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-green-100 text-black text-xs sm:text-sm">
              <tr>
                <th className="px-4 py-3">Device Id</th>
                <th className="px-4 py-3">Device Name</th>
                <th className="px-4 py-3">Contact Name</th>
                <th className="px-4 py-3">Contact Number</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Alert Name</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            {(searchAlert && Number(searchAlert.length) !== 0) ||
            searchAlert == null ? (
              <tbody>
                {searchAlert.length > 0 ? (
                  searchAlert.map((alert) => (
                    <tr
                      key={alert.id}
                      className="hover:bg-gray-50 text-sm text-gray-700"
                    >
                      <td className="px-4 py-3">{alert.deviceId}</td>
                      <td className="px-4 py-3">{alert.deviceName}</td>
                      <td className="px-4 py-3">{alert.contactName}</td>
                      <td className="px-4 py-3">{alert.contactNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{`${alert.date} ${alert.time}`}</td>
                      <td className="px-4 py-3  flex justify-center align-center">
                        <span className="bg-green-100 flex items-center text-xs px-3 py-1 rounded-full space-x-1 whitespace-nowrap w-fit">
                          <span className="font-medium text-green-800">
                            {alert.alertName}:
                          </span>
                          <span className="text-green-700">
                            {parseFloat(Number(alert.alertValue).toFixed(2))}
                          </span>
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-600 text-center">
                        <button
                          onClick={() => {
                            async function test() {
                              const response = await deleteAlert(alert.id);
                              if (response) {
                                if (searchTerm != "") {
                                  setSearchAlert([]);
                                  getAlertsByDeviceId(searchTerm).then(
                                    (alerts) => {
                                      if (alerts) {
                                        setSearchAlert(alerts);
                                      } else {
                                        toast.warn(
                                          "No alert found for this device "
                                        );
                                        window.location.reload();
                                      }
                                    }
                                  );
                                }

                                toast.success("Alert delete Succussfully");
                              }
                            }
                            test();
                          }}
                          className="hover:text-red-500 transition-colors duration-200"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : searchAlert == null ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-400">
                      No alerts found.
                    </td>
                  </tr>
                ) : (
                  <div className="flex justify-center items-center h-80 text-gray-600 text-lg font-semibold space-x-2">
                    {console.log("i am called loading data")}
                    <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                )}
              </tbody>
            ) : (
              <tbody className="">
                {getAllAlertData &&
                getAllAlertData.length > 0 &&
                alertFoundStatus == "true" ? (
                  getAllAlertData.map((alert) => (
                    <tr
                      key={alert.id}
                      className="hover:bg-gray-50 text-sm text-gray-700"
                    >
                      <td className="px-4 py-3">{alert.deviceId}</td>
                      <td className="px-4 py-3">{alert.deviceName}</td>
                      <td className="px-4 py-3">{alert.contactName}</td>
                      <td className="px-4 py-3">{alert.contactNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{`${alert.date} ${alert.time}`}</td>
                      <td className="px-4 py-3 flex justify-center align-center">
                        <span className="bg-green-100 flex items-center text-xs px-3 py-1 rounded-full space-x-1 whitespace-nowrap w-fit">
                          <span className="font-medium text-green-800">
                            {alert.alertName}:
                          </span>
                          <span className="text-green-700">
                            {parseFloat(Number(alert.alertValue).toFixed(2))}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-center">
                        <button
                          onClick={() => {
                            async function test() {
                              const response = await deleteAlert(alert.id);
                              if (response) {
                                console.log("alert delete by me ");

                                getAllAlerts({
                                  date: selectedDate,
                                  alertName: selectedFilter,
                                  page: selected,
                                  limit: 7,
                                }).then((alerts) => {
                                  if (alerts) {
                                    if (alerts.data.length == 0) {
                                      // setGetAllAlertData("Not Found");
                                      console.log(
                                        "i am called in set alert null 2"
                                      );
                                      setGetAllAlertData(null);
                                      setAlertFoundStatus("false");
                                      setPaginationTotal(0);
                                    } else {
                                      setGetAllAlertData(alerts.data);
                                      setAlertFoundStatus("true");
                                      setPaginationTotal(
                                        alerts.total
                                          ? Math.ceil(alerts.total / 7)
                                          : 1
                                      );
                                      console.log("Alerts:", alerts);
                                    }
                                  }
                                });
                                toast.success("Alert delete Succussfully");
                              }
                            }
                            test();
                          }}
                          className="hover:text-red-500 transition-colors duration-200"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : alertFoundStatus == "false" ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-400">
                      No alerts found.
                    </td>
                  </tr>
                ) : alertFoundStatus == "Loading" ? (
                  <tr>
                    <td colSpan="7" className="py-10 h-84">
                      <div className="flex items-center justify-center gap-2 w-full text-green-600 text-lg">
                        <svg
                          className="animate-spin h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                          ></path>
                        </svg>
                        <span className="font-medium">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            )}
          </table>
        </div>
      ) : (
        <div className="bg-white shadow rounded-b-lg overflow-x-auto">
          <table className="min-w-full table-fixed text-sm text-center">
            {SearchSettingAlert.length > 0 ? (
              <tbody>
                {SearchSettingAlert.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-green-100 text-black h-10 text-center">
                      <tr>
                        <th className="w-1/7 px-2">DeviceId</th>
                        <th className="w-1/7 px-2">Alert Name</th>
                        <th className="w-1/7 px-2">Upper Value</th>
                        <th className="w-1/7 px-2">Lower Value</th>
                        <th className="w-1/7 px-2">Added On</th>
                        <th className="w-1/7 px-2">Updated On</th>
                        <th className="w-1/7 px-2">Unit</th>
                        <th className="w-1/7 px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {SearchSettingAlert.map((alert) => (
                        <tr key={alert._id} className="hover:bg-gray-50">
                          <td className="w-1/7 px-2 py-3">{alert.deviceId}</td>
                          <td className="w-1/7 px-2 py-3">{alert.alertName}</td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.upperValue}
                          </td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.lowerValue}
                          </td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.createdAt?.slice(0, 10)}
                          </td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.updatedAt?.slice(0, 10)}
                          </td>
                          <td className="w-1/7 px-2 py-3">{alert.unit}</td>
                          <td className="w-1/7 px-2 py-3 flex items-center justify-center text-gray-600">
                            <div className="flex justify-center items-center ml-13 space-x-3">
                              <Pencil
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() => {
                                  setShowForm2(true);
                                  setAlertIdforUpdate(alert._id);
                                }}
                              />
                              <button
                                onClick={() => {
                                  async function test() {
                                    console.log(
                                      "Alert Setting Id is :- ",
                                      alert._id
                                    );
                                    const response = await deleteAlertSetting(
                                      alert._id
                                    );
                                    if (response) {
                                      if (SearchSettingTerm != "") {
                                        setSearchSettingAlert([]);
                                        getAlertSettingsByName(
                                          SearchSettingTerm
                                        ).then((alerts) => {
                                          if (alerts) {
                                            setSearchSettingAlert(alerts);
                                            console.log(
                                              "setting alert is :- ",
                                              alerts
                                            );
                                          }
                                        });
                                      }
                                      toast.success(
                                        `Alert ${alert.alertName} Delete for deviceId : ${alert.deviceId}`
                                      );
                                    }
                                  }
                                  test();
                                }}
                                className="hover:text-red-500 transition-colors"
                              >
                                <FaTrashAlt className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      No alerts found.
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                {alertSettingItems.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-green-100 text-black h-10 text-center">
                      <tr>
                        <th className="w-1/7 px-2">DeviceId</th>
                        <th className="w-1/7 px-2">Alert Name</th>
                        <th className="w-1/7 px-2">Upper Value</th>
                        <th className="w-1/7 px-2">Lower Value</th>
                        <th className="w-1/7 px-2">Added On</th>
                        <th className="w-1/7 px-2">Updated On</th>
                        <th className="w-1/7 px-2">Unit</th>
                        <th className="w-1/7 px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {alertSettingItems.map((alert) => (
                        <tr key={alert._id} className="hover:bg-gray-50">
                          <td className="w-1/7 px-2 py-3">{alert.deviceId}</td>
                          <td className="w-1/7 px-2 py-3">{alert.alertName}</td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.upperValue}
                          </td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.lowerValue}
                          </td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.createdAt?.slice(0, 10)}
                          </td>
                          <td className="w-1/7 px-2 py-3">
                            {alert.updatedAt?.slice(0, 10)}
                          </td>
                          <td className="w-1/7 px-2 py-3">{alert.unit}</td>
                          <td className="w-1/7 px-2 py-3 flex justify-center align-middle text-gray-600">
                            <div className="flex items-center ml-23  space-x-3">
                              <Pencil
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() => {
                                  setShowForm2(true);
                                  setAlertIdforUpdate(alert._id);
                                }}
                              />
                              <button
                                onClick={() => {
                                  async function test() {
                                    console.log(
                                      "Alert Setting Id is :- ",
                                      alert._id
                                    );
                                    const response = await deleteAlertSetting(
                                      alert._id
                                    );
                                    if (response) {
                                      getAllAlertSettings().then((alerts) => {
                                        if (alerts) {
                                          setAlertSettingItems(alerts);
                                        }
                                      });
                                      toast.success(
                                        `Alert ${alert.alertName} Delete for deviceId : ${alert.deviceId}`
                                      );
                                    }
                                  }
                                  test();
                                }}
                                className="hover:text-red-500 transition-colors"
                              >
                                <FaTrashAlt className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      No alerts found.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      )}
      {!searchId && selectedTab == "Alerts" ? (
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

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="">
            <AlertForm
              formData={formData}
              setFormData={setFormData}
              setShowForm={setShowForm}
              onSubmit={handleSubmit}
              onClose={() => {
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* popup model 2  */}
      {showForm2 && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="">
            <AlertForm
              formData={formData2}
              setFormData={setFormData2}
              onSubmit={handleSubmit2}
              setShowForm={setShowForm2}
              type={"Dealer"}
              onClose={() => {
                setShowForm2(false);
              }}
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
export default AlertManagerForDealer;
