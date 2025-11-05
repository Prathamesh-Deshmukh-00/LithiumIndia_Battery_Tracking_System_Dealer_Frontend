import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getDealerCustomer(deviceId,date , page = 1, limit  = 7) {
  const API_URL = `${WBSITELINK}/api/admin/getDealerCustomers/${deviceId}`;
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

    console.log('Customer:', response);
    console.log('date is :', date)
    return response.data;
  } catch (error) {
    console.error('Error fetching dealers:', error.response?.data || error.message);
    throw error;
  }
}

export {getDealerCustomer};