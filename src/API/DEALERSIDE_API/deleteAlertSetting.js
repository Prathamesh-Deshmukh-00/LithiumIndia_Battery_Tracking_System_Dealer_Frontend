
const WBSITELINK = import.meta.env.VITE_WBSITELINK;

async function deleteAlertSetting(alertSettingId) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found in localStorage.");
    return;
  }

  try {
    const response = await fetch(
      `${WBSITELINK}/api/dealer/deleteDealerAlertSetting/${alertSettingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete dealer alert setting:", errorData);
      return;
    }

    const data = await response.json();
    console.log("Success:", data.message);
    return data.message;
  } catch (error) {
    console.error("Error occurred while deleting dealer alert setting:", error);
  }
}

export { deleteAlertSetting };
