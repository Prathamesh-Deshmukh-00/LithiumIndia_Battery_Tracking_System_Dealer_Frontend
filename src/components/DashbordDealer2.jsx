import React, { useState } from "react";
import { Search, ChevronLeft } from "lucide-react";
import {
  SOC,
  SOH,
  Temperature,
  Odometer, // optional, if unused, remove
} from "./index.js"; // Adjust path if needed

const Dashboard = ({ setDevice, dealerdata }) => {
  const [select, setSelect] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredDevices = () => {
    const filtered = dealerdata.devices.filter((device) => {
      const matchesStatus =
        select === "All" ||
        device.state ===
          {
            Moving: "moving",
            Idle: "idle",
            "On-Charging": "charging",
            Offline: "offline",
          }[select];

      const matchesSearch = device.deviceId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    return filtered;
  };

  const getCount = (status) => {
    if (status === "All") return dealerdata.counts.all || 0;
    const keyMap = {
      Moving: "moving",
      Idle: "idle",
      "On-Charging": "charging",
      Offline: "offline",
    };
    return dealerdata.counts[keyMap[status]] || 0;
  };

  return (
    <div className="p-4 w-full min-h-screen pb-15 bg-green-50">
      {/* Header */}
      <div className="flex flex-col gap-4 mt-3 mr-10">
        <div className="flex">
          <ChevronLeft
            className="h-10 w-10 cursor-pointer"
            onClick={() => setDevice(false)}
          />
          <h1 className="text-2xl mt-1 font-bold">Dashboard</h1>
        </div>

        {/* Search & Filters */}
        <div className="p-3 bg-white">
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex flex-row p-2 border bg-white hover:border-emerald-600 focus-within:shadow-md focus-within:border-emerald-600 transition-all duration-200 rounded-full w-full max-w-md">
              <Search className="mr-2 text-gray-500 group-hover:text-emerald-600" />
              <input
                type="text"
                placeholder="Search by device ID"
                className="w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm && searchTerm !== "" ? (
              ""
            ) : (
              <div className="inline-flex border rounded-md  overflow-hidden">
                {["All", "Moving", "Idle", "On-Charging", "Offline"].map(
                  (status, i) => (
                    <div
                      key={i}
                      onClick={() => setSelect(status)}
                      className={`cursor-pointer p-2 flex items-center justify-center border-r 
        w-40 text-sm font-medium transition-all duration-200
        ${
          select === status
            ? "bg-[#019D6D] text-white"
            : "bg-white text-gray-700 hover:bg-green-100"
        }
        first:rounded-l-md last:rounded-r-md last:border-r-0`}
                    >
                      <span>{status}</span>
                      <p
                        className={`ml-2 px-2 py-1 rounded text-xs font-semibold 
          ${
            select === status
              ? "bg-white text-[#019D6D]"
              : "bg-green-50 text-green-700"
          }`}
                      >
                        {getCount(status)}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Devices Scrollable Grid */}
      <div
        className="mt-6 mr-10 grid grid-cols-1 gap-4 overflow-y-auto pr-4"
        style={{ maxHeight: "70vh" }}
      >
        {getFilteredDevices().map((device, index) => (
          <div
            key={index}
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-6 
              gap-4 w-full
            "
          >
            {/* Device Info Box */}
            <div className="bg-white p-5 ml-10 rounded-lg  shadow flex flex-col hover:bg-green-100 hover:scale-102 justify-between border col-span-1 xl:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">{device.deviceName}</h2>
                <span className="text-xs px-2 py-1 bg-green-200 rounded-full capitalize">
                  {device.state}
                </span>
              </div>
              <p className="text-xs text-gray-600">IMEI: {device.imei}</p>
              <p className="text-xs text-gray-600">
                DeviceID: {device.deviceId}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last Updated: {device.lastUpdated ? device.lastUpdated : "N/A"}
              </p>
              <div className="flex items-center justify-end mt-2">
                {select === "Moving" && (
                  <span className="text-sm font-medium">
                    🚀 {device.speed ?? 0} km/h
                  </span>
                )}
                {select === "On-Charging" && (
                  <span className="text-sm font-medium">
                    🔋 {device.metrics?.current?.toFixed(2) ?? "0"} amp
                  </span>
                )}
              </div>
            </div>

            
            {/* SOC */}
            <div className="bg-green-100 p-5 rounded-lg flex justify-between w-full">
              <div className="flex flex-col justify-around">
                <span className="text-sm text-gray-600">SOC %</span>
                <span className="text-2xl font-bold text-black">
                  {device.metrics?.SOC ?? 0}
                </span>
              </div>
              <div className="flex flex-col justify-around items-center">
                <span className="text-xs text-gray-600">
                  {device.metrics?.current?.toFixed(2) ?? "0"} amp
                </span>
                <div className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center">
                  <img
                    src={SOC}
                    alt="SOC icon"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Temperature */}
            <div className="bg-green-100 p-5 rounded-lg flex justify-between w-full">
              <div className="flex justify-around flex-col">
                <span className="text-sm text-gray-600">Temperature ℃</span>
                <span className="text-2xl font-bold text-black">
                  {device.metrics?.temperature?.toFixed(1) ?? 0}
                </span>
              </div>
              <div className="flex justify-end items-end">
                <div className="w-10 h-10 bg-green-200 rounded-md flex items-center mr-5 mb-5 justify-center">
                  <img
                    src={Temperature}
                    alt="temperature icon"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* SOH */}
            <div className="bg-green-100 p-3 rounded-lg flex justify-between w-full">
              <div className="flex justify-around flex-col">
                <span className="text-sm text-gray-600">SOH %</span>
                <span className="text-2xl font-bold text-black">
                  {device.metrics?.SOH?.replace("%", "") ?? 0}
                </span>
              </div>
              <div className="flex items-end mr-5 mb-5">
                <div className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center">
                  <img
                    src={SOH}
                    alt="SOH icon"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Current instead of Odometer */}
            <div className="bg-green-100 p-3 rounded-lg flex justify-between w-full">
              <div className="flex justify-around flex-col">
                <span className="text-sm text-gray-600">Current (A)</span>
                <span className="text-2xl font-bold text-black">
                  {device.metrics?.current?.toFixed(2) ?? 0}
                </span>
              </div>
              <div className="flex items-end mr-5 mb-5">
                <div className="w-10 h-10 bg-green-200 rounded-md flex items-center justify-center">
                  ⚡
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
