import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const deleteCustomer = async (customerId) => {
  const url = `${WBSITELINK}/api/dealer/deleteCustomerForDealer/${customerId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data.message); // e.g., "Customer (customerId=...) deleted successfully"
    return response.data;
  } catch (error) {
    console.error("Failed to delete customer for dealer:", error.response?.data || error.message);
    throw error;
  }
};

export { deleteCustomer };
