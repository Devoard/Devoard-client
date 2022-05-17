import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

export function useAlert() {
  const headers = {
    Authorization: `Token ${token}`,
  };

  const getAlertList = async (userId) => {
    const response = await axios.get(
      "http://localhost:8000/alter/alter_list/",
      {
        params: { username: userId },
        headers,
      }
    );
    const data = await response.data;
    return data;
  };

  const getAlertDetail = async (alertId) => {
    const response = await axios.get("http://localhost:8000/alter/detail/", {
      params: { id: alertId },
      headers,
    });
    const data = await response.data;
    return data;
  };

  return {
    getAlertList,
    getAlertDetail,
  };
}
