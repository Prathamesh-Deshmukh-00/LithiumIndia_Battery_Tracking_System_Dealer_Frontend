import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function addDevice(deviceData,token) {
  const url = `${WBSITELINK}/api/admin/addDevice`;
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3NlciI6eyJpZCI6IjY3ZTYzNGU0Zjg1ZjlhNjM4ZWVmYzdjYiIsIm5hbWUiOiJSaXNoYWJoIFBhdGlsIiwicGhvbmUiOiI5MTMxNTcwNTYxIiwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTc0NDk3Nzc0NSwiZXhwIjoxNzQ0OTgxMzQ1fQ.HAJXoCbzh3JO56W8uHjhAjprojyR2GtJZHxrg2DwsRc';

  try {
    const response = await axios.post(url, deviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("device data come from backend is",response);
    return response;
  } catch (error) {
    console.log("device data error come from backend is",error);
    return {
      error: true,
      message: error.response?.data || error.message
    };
  }
}

export {addDevice};
