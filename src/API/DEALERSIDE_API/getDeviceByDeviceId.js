import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getDeviceByDeviceId(deviceId) {
  const API_URL = `${WBSITELINK}/api/dealer/getDealerDeviceByDeviceId/${deviceId}`;
  const TOKEN = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // console.log('Dealer Device ID:', deviceId);
    // console.log('Dealer Device Data:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dealer device:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export { getDeviceByDeviceId };
