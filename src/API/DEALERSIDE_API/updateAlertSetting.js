import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function updateAlertSetting(data) {
  const {
    id,
    deviceId,
    alertName,
    upperValue,
    lowerValue,
    unit
  } = data;

  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token not found in localStorage");
  }

  const url = `${WBSITELINK}/api/dealer/updateDealerAlertSetting/${id}`;

  try {
    const response = await axios.patch(url, {
      deviceId,
      alertName,
      upperValue,
      lowerValue,
      unit
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Failed to update dealer alert setting: ${message}`);
  }
}

export { updateAlertSetting };
