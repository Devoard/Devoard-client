import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:8000/alter";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const AlertAPI = {
  getAlertList: async (userId) => {
    let result = null;
    const res = await axios
      .get(`${url}/alter_list/`, {
        params: { username: userId },
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  getAlertDetail: async (alertId) => {
    let result = null;
    const res = await axios
      .get(`${url}/detail/`, {
        params: { id: alertId },
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },
};

export default AlertAPI;
