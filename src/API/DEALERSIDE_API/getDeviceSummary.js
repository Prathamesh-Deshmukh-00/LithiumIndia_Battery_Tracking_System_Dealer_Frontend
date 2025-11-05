import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const getDeviceSummary = async (type) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found in localStorage.");
    }

    const baseURL = `${WBSITELINK}/api/dealer/getDeviceSummary`;

    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: type ? { type } : {}
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching device summary:', error.message);
    throw error;
  }
};


export {getDeviceSummary};
