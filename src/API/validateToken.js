import axios from "axios";
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

const validateToken = async () => {
  console.log("validation api called")
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found.");
    return { success: false, message: "Token not available" };
  }

  try {
    const response = await axios.get(
      `${WBSITELINK}/validateToken`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Success response
    if (response.status === 200) {
      return {
        success: true,
        data: response.data, // user data like id, name, phone, role
      };
    }
  } catch (error) {
    // Handle 401 or other errors
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        return {
          success: false,
          title: data.title || "Unauthorized",
          message: data.message || "User is not authorized",
        };
      }

      return {
        success: false,
        title: "Error",
        message: data.message || "Something went wrong",
      };
    }

    // Network or unexpected errors
    return {
      success: false,
      title: "Network Error",
      message: error.message,
    };
  }
};

export  default validateToken;
