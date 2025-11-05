import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function UpdateDevice(deviceData,dataId) {
  const url = `${WBSITELINK}/api/admin/updateDevice/${dataId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(url, deviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Updated device data come from backend is",response);
    return response;
  } catch (error) {
    console.log("error come from backend while update device is",error);
    return {
      error: true,
      message: error.response?.data || error.message
    };
  }
}

export {UpdateDevice};
