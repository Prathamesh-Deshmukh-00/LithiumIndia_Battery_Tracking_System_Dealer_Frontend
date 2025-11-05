import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getDealers() {

    const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${WBSITELINK}/api/admin/getDealers`,
      {
        headers: {
          Authorization:  `Bearer ${token}`,
        }
      }
    );

    if (response.status === 200) {
      return response.data.result;
    }
  } catch (error) {
    console.error('Error fetching dealers:', error.message);
    return [];
  }
}

export {getDealers};