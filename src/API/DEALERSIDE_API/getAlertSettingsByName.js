
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getAlertSettingsByName(name) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found in localStorage.");
    return [];
  }

  const apiUrl = `${WBSITELINK}/api/dealer/getDealerAlertSettingByAlertName?name=${encodeURIComponent(name)}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Dealer Alert Settings:", result);
    return result.data;
  } catch (error) {
    console.error("Failed to fetch dealer alert settings:", error.message);
    return [];
  }
}

export { getAlertSettingsByName };
