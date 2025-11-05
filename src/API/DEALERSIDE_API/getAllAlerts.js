import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getAllAlerts({
  date,              // e.g., '2025/04/10'
  alertName,         // optional, e.g., 'temperature'
  page = 1,
  limit = 7
}) {
  const baseUrl = `${WBSITELINK}/api/dealer/getDealerAlerts`;
  const token = localStorage.getItem("accessToken");

  // Build query params
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (alertName) params.append('alertName', alertName);
  params.append('page', page);
  params.append('limit', limit);

  const urlWithParams = `${baseUrl}?${params.toString()}`;

  try {
    const response = await axios.get(urlWithParams, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log('Total Dealer Alerts:', response.data.total);
      return response.data;
    } else {
      throw new Error(`Failed to fetch dealer alerts. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching dealer alerts:', error.message);
    return null;
  }
}

export { getAllAlerts };
