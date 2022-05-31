import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:8000/devoard";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const PostAPI = {
  getPosts: async (state) => {
    let res = null;
    if (state === "all") {
      res = await axios.get(`${url}`, { headers }).catch((err) => {
        console.log(err);
      });
    }
    if (state === "ongoing") {
      res = await axios
        .get(`${url}`, {
          params: {
            recruit_state: "True",
          },
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (state === "done") {
      res = await axios
        .get(`${url}`, {
          params: {
            recruit_state: "False",
          },
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return res.data;
  },
  getDetailPost: async (id) => {
    const res = await axios.get(`${url}/${id}`).catch((err) => {
      console.log(err);
    });

    return res.data;
  },
  getRecentPosts: async () => {
    const res = await axios.get(`${url}Now/`).catch((err) => console.log(err));

    return res.data;
  },
  createPost: async (data) => {
    await axios.post(`${url}/`, data).catch((err) => {
      console.log(err);
    });
  },
  updatePost: async (id, data) => {
    await axios.patch(`${url}/${id}`, data).catch((err) => {
      console.log(err);
    });
  },
  removePost: async (id) => {
    await axios.delete(`${url}/${id}`).catch((err) => {
      console.log(err);
    });
  },
};

export default PostAPI;
