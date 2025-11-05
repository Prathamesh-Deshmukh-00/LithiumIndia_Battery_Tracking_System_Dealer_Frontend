import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getDealerCustomerByName(dealerId, name) {
  const url = `${WBSITELINK}/api/admin/getDealerCustomersByName/${dealerId}`;
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(url, {
      params: { name },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
    //   console.log("Total customers found:", response.data.total);
      return response.data;  // returns an array of customer objects
    } else {
      console.warn("Unexpected status code:", response.status);
      return null;
    }

  } catch (error) {
    console.error("Error fetching customer data:", error.response?.data || error.message);
    return null;
  }
}

export {getDealerCustomerByName};