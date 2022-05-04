import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getApplyProject } from "../modules/project";

const cookies = new Cookies();
const token = cookies.get("token");

export const useProject = () => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.user);
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
        dispatch(
          getApplyProject({
            username: loggedUser.id,
          })
        );
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
        dispatch(
          getApplyProject({
            username: loggedUser.id,
          })
        );
        alert(res.data);
      });
  };

  return {
    acceptAwaiter,
    rejectAwaiter,
  };
};
