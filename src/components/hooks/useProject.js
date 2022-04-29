import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");
export const useProject = () => {
  const headers = {
    Authorization: `Token ${token}`,
  };

  const acceptAwaiter = async (username, p_id, select_awaiter) => {
    const body = {
      username,
      p_id,
      select_awaiter,
    };
    await axios
      .post("http://localhost:8000/project/access_awaiter/", body, {
        headers,
      })
      .then((res) => {
        alert(res.data);
      });
  };

  const rejectAwaiter = async (username, p_id, select_awaiter) => {
    const body = {
      username,
      p_id,
      select_awaiter,
    };
    await axios
      .post("http://localhost:8000/project/reject_awaiter/", body, {
        headers,
      })
      .then((res) => {
        alert(res.data);
      });
  };

  return {
    acceptAwaiter,
    rejectAwaiter,
  };
};
