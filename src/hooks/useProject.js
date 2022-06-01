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

  const getProject = async (project_id) => {
    const response = await axios.get("http://localhost:8000/project/detail/", {
      params: {
        project_id,
      },
      headers,
    });
    const data = await response.data;
    // const data = {
    //   project_detail: {
    //     title: "44",
    //     recruit_state: true,
    //     field: "['Spring', 'Vue']",
    //     frontend_cnt: "4",
    //     backend_cnt: "1",
    //     android_cnt: "0",
    //     ios_cnt: "0",
    //     data_cnt: "0",
    //     devops_cnt: "0",
    //     body: "44",
    //     period: "0",
    //     done: "준비 중",
    //     date: "2022-05-16",
    //     writer: {
    //       id: 2,
    //       username: "Zy0ung",
    //       git_userImg: "-",
    //     },
    //     id: 8,
    //   },
    //   team_master: "Zy0ung",
    //   joiner: ["dvlops87"],
    //   id: 3,
    // };
    return data;
  };

  return {
    acceptAwaiter,
    rejectAwaiter,
    getProject,
  };
};
