import axios from 'axios';
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function getOTP(email) {
  try {
    const response = await axios.get(`${WBSITELINK}/api/admin/getOTP`, {
      params: { email }
    });

    // Directly access OTP from the response
    const otp = response.data?.OTP;

    if (otp) {
      return otp;
    } else {
      throw new Error('OTP not found in response');
    }

  } catch (error) {
    console.error('Error fetching OTP:', error.message);
    return null;
  }
}

export { getOTP };
