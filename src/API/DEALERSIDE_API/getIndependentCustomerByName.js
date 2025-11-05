import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const getIndependentCustomerByName = async (name) => {
  const token = localStorage.getItem("accessToken");
  const url = `${WBSITELINK}/api/dealer/getDealerCustomerByName`;
  console.log("name is :-", name);

  try {
    const response = await axios.get(url, {
      params: { name },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = response.data;



    console.log('Dealer Customer Data:', result);
    return result.data;
  } catch (error) {
    console.error('Error fetching dealer customer:', error);
    return { data: [] };
  }
};

export { getIndependentCustomerByName };
