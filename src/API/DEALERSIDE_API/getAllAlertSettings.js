import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const getAllAlertSettings = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token not found in localStorage');
      return [];
    }

    const response = await axios.get(`${WBSITELINK}/api/dealer/getDealerAlertSettings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log('Dealer Alert Settings:', response.data.data);
      return response.data.data;
    } else {
      console.error('Unexpected response:', response.status, response.statusText);
      return [];
    }

  } catch (error) {
    console.error('Error fetching dealer alert settings:', error.message);
    return [];
  }
};

export { getAllAlertSettings };
