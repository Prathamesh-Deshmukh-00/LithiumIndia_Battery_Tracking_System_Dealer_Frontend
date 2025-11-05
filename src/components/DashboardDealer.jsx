import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const statusOptions = [
  { label: "All Devices", value: "All" },
  { label: "Moving", value: "Moving" },
  { label: "Offline", value: "Offline" },
  { label: "Idle State", value: "Idle State" },
  { label: "On Charging", value: "On Charging" },
];

export default function Dashboard({ setDevice, dealerdata }) {
  const [devicesData, setDevicesData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const mapRef = useRef(null);
  const [dealerdataFound, setDealerDataFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (dealerdata) {
        setDealerDataFound(true);
      }
    }, 15000);
  }, [dealerdata]);

  useEffect(() => {
    (async function () {
      if (
        dealerdata &&
        typeof dealerdata === "object" &&
        Object.keys(dealerdata).length > 0
      ) {
        const response = dealerdata;
        const finalDevices = response.devices.map((data, index) => ({
          id: index,
          name: data?.deviceName || `Device ${index + 1}`,
          imei: data?.imei || "Unknown",
          temp: data?.metrics?.temperature ?? "Not Found",
          status: data?.state || "Offline",
          lat: data?.location?.latitude,
          lng: data?.location?.longitude,
          updated: data?.lastUpdated || "Unknown",
          locationUpdated: data?.location?.updatedAt || null,
        }));
        setDevicesData(finalDevices);
      }
    })();
  }, [dealerdata]);

  const filteredDevices =
    selectedStatus === "All"
      ? devicesData
      : devicesData.filter(
          (d) => String(d.status).toLowerCase() === selectedStatus.toLowerCase()
        );

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const validDevices = filteredDevices.filter(
      (device) => device.lat != null && device.lng != null
    );

    if (validDevices.length === 0) return;

    const bounds = L.latLngBounds(
      validDevices.map((device) => [device.lat, device.lng])
    );
    map.fitBounds(bounds, { padding: [80, 80] });
  }, [filteredDevices]);

  if (devicesData.length !== 0) {
    return (
      <div className="p-4 bg-green-50 w-full pb-15">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Panel */}
          <div
            className="
              col-span-1 space-y-4 
              h-[600px] max-[1400px]:h-[500px] max-[1280px]:h-[450px] 
              max-[1024px]:h-[400px] max-[768px]:h-[300px] 
              overflow-y-auto
            "
          >
            {/* Alerts and Status */}
            <div className="bg-white rounded-md shadow-md p-4 space-y-4">
              <div className="w-full p-4 rounded-lg border border-orange-300 bg-orange-100 hover:border-orange-700 transition-colors shadow-sm">
                <p className="text-orange-800 font-semibold flex items-center gap-2">
                  ⚠️ {`Total Alerts :  ${dealerdata.counts.alert}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((item, idx) => {
                  const icon = {
                    All: "📱",
                    Moving: "🚗",
                    Offline: "📴",
                    "Idle State": "💤",
                    "On Charging": "🔋",
                  }[item.value];

                  const count =
                    item.value === "All"
                      ? devicesData.length
                      : devicesData.filter(
                          (d) =>
                            d.status?.toLowerCase() === item.value.toLowerCase()
                        ).length;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedStatus(item.value)}
                      className={`p-3 cursor-pointer rounded-md shadow-md border flex items-center justify-between hover:bg-green-200 ${
                        selectedStatus.toLowerCase() ===
                        item.value.toLowerCase()
                          ? "bg-green-100"
                          : "bg-white"
                      } `}
                    >
                      <div>
                        <div className="text-sm text-gray-500">
                          {item.label}
                        </div>
                        <div className="text-xl font-bold">{count}</div>
                      </div>
                      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">{icon}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Device List */}
            <div className="bg-white rounded-md shadow-md p-3 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{selectedStatus} Devices</h2>
                <button
                  className="text-sm text-gray-500 hover:text-green-500"
                  onClick={() => setDevice(true)}
                >
                  See all
                </button>
              </div>

              <div className="space-y-2">
                {filteredDevices.length !== 0 ? (
                  filteredDevices.map((device) => (
                    <div
                      key={device.id}
                      className="border p-3 rounded-md text-sm transition-transform duration-200 transform hover:scale-105 hover:bg-green-100 cursor-pointer"
                      onClick={() => {
                        setDevice(true);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">{device.name}</div>
                        <span className="bg-green-200 px-2 py-0.5 text-xs rounded-full">
                          {device.status}
                        </span>
                      </div>
                      <div className="text-gray-500 text-xs">
                        IMEI: {device.imei}
                        <br />
                        Last Updated: {device.updated}
                      </div>
                      <div className="flex justify-end items-center mt-1">
                        <span className="mr-1">🌡️</span>
                        {Number(device.temp).toFixed(2)} °C
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm">No Data Found</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Map Panel */}
          <div
            className="
              col-span-1 lg:col-span-3 rounded-md shadow-md overflow-hidden
              h-[600px] max-[1400px]:h-[500px] max-[1280px]:h-[450px] 
              max-[1024px]:h-[400px] max-[768px]:h-[300px]
            "
          >
            <MapContainer
              center={[19.076, 72.8777]}
              zoom={5}
              className="w-full h-full"
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {filteredDevices
                .filter((device) => device.lat != null && device.lng != null)
                .map((device) => (
                  <Marker key={device.id} position={[device.lat, device.lng]}>
                    <Popup>
                      <strong>{device.name}</strong>
                      <br />
                      Status: {device.status}
                      <br />
                      Temp: {device.temp.toFixed(2)} °C
                      <br />
                      IMEI: {device.imei}
                      <br />
                      Last Location Update date:{" "}
                      {device?.locationUpdated?.split("T")[0]}
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
    );
  } else {
    return dealerdataFound && devicesData.length === 0 ? (
      <div className="flex justify-center items-center min-h-screen min-w-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md border border-red-300">
          <h2 className="text-lg font-semibold text-gray-700">
            Dealer Data Not Found or Not Added Till Now
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please check back later or try refreshing the page.
          </p>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-100">
        <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow">
          <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700 font-medium">Loading...</span>
        </div>
      </div>
    );
  }
}
