import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function addDeviceDealer(deviceData) {
  const url = `${WBSITELINK}/api/dealer/addDevice`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(url, deviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const message = response?.data?.message || "";
    const deviceIdMatch = message.match(/deviceId:\s*(\w+)/);

    if (deviceIdMatch && deviceIdMatch[1]) {
      return {
        success: true,
        status: response.status,
        message: `Device registered with deviceId: ${deviceIdMatch[1]}`,
      };
    }

    return {
      success: false,
      status: response.status,
      message: "Unexpected response format from dealer API.",
    };

  } catch (error) {
    console.log("Dealer device add error:", error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message
    };
  }
}

export { addDeviceDealer };
