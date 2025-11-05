import axios from "axios";

const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function addAlert(alertData) {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `${WBSITELINK}/api/dealer/addAlerts`,
      alertData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    console.log("Success:", response);
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a status outside the 2xx range
      console.error("Error:", error.response.data.message || "Something went wrong");
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.error("No Response:", error.request);
    } else {
      // Other errors
      console.error("Axios Error:", error.message);
    }
  }
}

export { addAlert };
