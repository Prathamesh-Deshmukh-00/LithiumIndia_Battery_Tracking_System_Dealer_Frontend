import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const API_URL = `${WBSITELINK}/api/dealer/deleteDealerAlert`;

async function deleteAlert(alertId) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found in localStorage.");
    return;
  }

  try {
    const response = await axios.delete(`${API_URL}/${alertId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Success:', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error deleting dealer alert:', error.response?.data || error.message);
    throw error;
  }
}

export { deleteAlert };
