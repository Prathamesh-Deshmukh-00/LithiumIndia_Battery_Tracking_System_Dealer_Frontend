import axios from "axios";
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const loginDealer = async (data) => {
  try {
    const response = await axios.post(`${WBSITELINK}/api/dealer/loginDealer`, {
      phone: data.phone,
      password: data.password
    });

    const { accessToken, name } = response.data;

    // Save token to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("Name", name); // Optional
    if(accessToken){
        return response.data;
    }

    console.log("Login successful!");
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return error.response?.data;
  }
};

export {loginDealer};