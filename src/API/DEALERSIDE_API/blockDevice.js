const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function blockDevice(deviceId, value) {
  const url = `${WBSITELINK}/api/dealer/blockDealerDevice/${deviceId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isBlocked: value })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Success:', data.message);
      return data.message;
    } else {
      console.error('Error:', data);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

export { blockDevice };
