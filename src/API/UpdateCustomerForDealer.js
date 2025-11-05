import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const API_BASE_URL = `${WBSITELINK}/api/admin/updateCustomerForDealer`;
const token = localStorage.getItem("accessToken");

async function updateCustomerForDealer(customerid, customerData) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${customerid}`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if(response.status == 200){
        return response;
    }else{
        console.warn("Unexpected status code:", response.status);
        return null;
    }

  } catch (error) {
    console.error('❌ Error registering customer:', error.response?.data || error.message);
    return error;
  }
}

export { updateCustomerForDealer };
