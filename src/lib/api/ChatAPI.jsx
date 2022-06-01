import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:8000/chat";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const ChatAPI = {
  submitChat: async (body) => {
    let result = null;
    const res = await axios
      .post(`${url}/list/`, body, { headers })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  getChatList: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/list/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  chatDetailList: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/detail/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },
};

export default ChatAPI;
