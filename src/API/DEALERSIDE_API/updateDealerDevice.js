import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function updateDealerDevice(deviceData, deviceId) {
  const url = `${WBSITELINK}/api/dealer/updateDealerDevice/${deviceId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(url, deviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Updated dealer device data from backend is", response);
    return response;
  } catch (error) {
    console.log("Error from backend while updating dealer device is", error);
    return {
      error: true,
      message: error.response?.data || error.message
    };
  }
}

export { updateDealerDevice };
