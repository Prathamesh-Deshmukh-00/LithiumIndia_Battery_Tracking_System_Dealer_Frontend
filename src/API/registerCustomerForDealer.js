import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const API_BASE_URL = `${WBSITELINK}/api/admin/registerCustomerForDealer`;
const token = localStorage.getItem("accessToken");

async function registerCustomerForDealer(dealerId, customerData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${dealerId}`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if(response.status == 201){
        return response.data;
    }else{
        console.warn("Unexpected status code:", response.status);
        return null;
    }

  } catch (error) {
    console.error('❌ Error registering customer:', error.response?.data || error.message);
    return error;
  }
}

export { registerCustomerForDealer };
