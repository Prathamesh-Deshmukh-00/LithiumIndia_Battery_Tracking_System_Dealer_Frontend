import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function updateDealer(dealerId,  data) {
  const url = `${WBSITELINK}/api/admin/updateDealer/${dealerId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ Dealer updated successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('❌ Failed to update dealer:', error.response?.data || error.message);
    throw error;
  }
}

export {updateDealer};
