const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function blockCustomer(customerId, value) {
  const url = `${WBSITELINK}/api/dealer/blockDealerCustomer/${customerId}`;
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
      console.log('Dealer Success:', data.message);
      return data.message;
    } else {
      console.error('Dealer Error:', data);
    }
  } catch (error) {
    console.error('Dealer Request failed:', error);
  }
}

export { blockCustomer };
