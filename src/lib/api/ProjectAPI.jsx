import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:8000/project";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const ProjectAPI = {
  getMakedList: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/my_project/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  getJoinList: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/join_project/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  getApplyProject: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/apply_project/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  getProject: async (project_id) => {
    let result = null;
    const res = await axios
      .get(`${url}/detail/`, {
        params: {
          project_id,
        },
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  acceptAwaiter: async (username, p_id, select_awaiter) => {
    const body = {
      username,
      p_id,
      select_awaiter,
    };
    let result = null;
    const res = await axios
      .post(`${url}/access_awaiter/`, body, {
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  rejectAwaiter: async (username, p_id, select_awaiter) => {
    const body = {
      username,
      p_id,
      select_awaiter,
    };
    let result = null;
    const res = await axios
      .post(`${url}/reject_awaiter/`, body, {
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },
};

export default ProjectAPI;
