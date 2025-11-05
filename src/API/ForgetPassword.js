import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function forgotPassword(email, newPassword) {
  try {
    const response = await axios.post(`${WBSITELINK}/api/admin/forgotPassword`, {
      email,
      newPassword
    });

    if (response.status === 200 && response.data?.message) {
        console.log("response is :- ",response)
      return response.data.message;
    } else {
      throw new Error('Unexpected response');
    }
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return null;
  }
}

export { forgotPassword };
