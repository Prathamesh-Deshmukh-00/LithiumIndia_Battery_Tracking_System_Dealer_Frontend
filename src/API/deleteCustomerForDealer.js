import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

 const deleteCustomerForDealer = async (customerId, dealerId) => {
  const url = `${WBSITELINK}/api/admin/deleteCustomerForDealer`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        customerId,
        dealerId
      }
    });

    console.log(response.data.message); // "Customer (customerId=...) deleted successfully"
    return response.data;
  } catch (error) {
    console.error("Failed to delete customer for dealer:", error.response?.data || error.message);
    throw error;
  }
};

export {deleteCustomerForDealer};