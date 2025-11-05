import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const getAllIndependentCustomers = async (
  date,
  page = 1,
  limit = 7
) => {
  const API_URL = `${WBSITELINK}/api/dealer/getDealerCustomers`;
  const token = localStorage.getItem("accessToken");

  try {
    const params = {
      page,
      limit,
      ...(date && { date })
    };

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });

    // Format the data to match admin-like structure
    const formattedData = response.data.data.map((customer) => ({
      customerId: customer.customerId,
      customerName: customer.name,
      email: customer.email,
      phone: customer.phone,
      addedOn: customer.createdAt,
      isBlocked : customer?.isBlocked || false,
      companyName: 'N/A',
      address: `${customer.address.city}${customer.address.state ? ', ' + customer.address.state : ''}`,
      devicesSoldCount: customer.devicesSold,
      devices: customer.devices.map((device, idx) =>
        `${idx + 1}. ${device.deviceName} (${device.imei})`
      )
    }));

    return {
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
      data: formattedData
    };

  } catch (error) {
    console.error('Error fetching dealer customers:', error.response?.data || error.message);
    throw error;
  }
};

export { getAllIndependentCustomers };
