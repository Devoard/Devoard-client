import axios from "axios";

const url = "http://localhost:8000/devoard";

const PostAPI = {
  getPosts: async (state, page) => {
    let res = null;
    let params = { page: page }

    if (state === "ongoing") params.recruit_state = 'True';
    if (state === "done") params.recruit_state = 'False';

    res = await axios
        .get(`${url}`, { params: params })
        .catch((err) => console.log(err));

    return res.data.results;
  },
  getPostsCnt: async () => {
    const params = { page: 1, recruit_state: 'True' }
    const res = await axios
      .get(`${url}`, { params: params })
      .catch(err => console.log(err));

    return res.data.count;
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
    await axios.put(`${url}/${id}/`, data).catch((err) => {
      console.log(err);
    });
  },
  updateRecruit: async (id, data) => {
    await axios.put(`${url}/${id}/btn`, data).catch((err) => {
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
