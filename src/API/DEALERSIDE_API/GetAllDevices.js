import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getAllDealerDevices(date, page = 1, limit = 6) {
  const API_URL = `${WBSITELINK}/api/dealer/getAllDealerDevices`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        date,
        page,
        limit
      },
    });

    console.log('date is :', date?.toString());
    console.log('page is :', page);
    console.log('Devices:', response);
    return response;
  } catch (error) {
    console.error('Error fetching dealer devices:', error.response?.data || error.message);
    throw error;
  }
}

export { getAllDealerDevices };
