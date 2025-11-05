import axios from "axios";
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const registerCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${WBSITELINK}/api/dealer/registerDealerCustomer`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    console.log("Dealer customer registered successfully:", response);
    return response;
  } catch (error) {
    console.error("Error registering dealer customer:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Dealer customer registration failed"
    };
  }
};

export  {registerCustomer};
