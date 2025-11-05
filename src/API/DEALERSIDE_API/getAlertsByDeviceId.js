import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getAlertsByDeviceId(deviceId) {
  const token = localStorage.getItem("accessToken"); // get token from localStorage

  if (!token) {
    console.error("No access token found in localStorage.");
    return null;
  }

  const apiUrl = `${WBSITELINK}/api/dealer/getDealerAlertByDeviceId?deviceId=${deviceId}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Dealer Alert Data:", response.data.data);
    return response.data.data;

  } catch (error) {
    console.error('Failed to fetch dealer alerts:', error.response?.data || error.message);
    return null;
  }
}

export { getAlertsByDeviceId };
