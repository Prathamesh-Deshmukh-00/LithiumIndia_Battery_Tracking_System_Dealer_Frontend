import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function updateCustomer(customerId, customerData) {
  const url = `${WBSITELINK}/api/dealer/updateCustomerForDealer/${customerId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(url, customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Dealer Customer Update Response:', response);
    if(response.status == 200 ){
      return response;
    }
  } catch (error) {
    console.error('Error updating dealer customer:', error.response?.data || error.message);
    return error;
  }
}

export { updateCustomer };
