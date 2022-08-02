import axios from "axios";

const url = "http://localhost:8000/user/profile";

const ProfileAPI = {
  getProfileData: async (username) => {
    let result = null;
    const params = {
      username: username,
    };
    const res = await axios
      .get(`${url}`, {
        params: params,
      })
      .catch((err) => {
        console.log(err);
      });

    if (res) result = res.data;

    return result;
  },
  updateProfileData: async (id, data) => {
    await axios.patch(`${url}/`, data).catch((err) => console.log(err));
  },
  updateProfileImg: async (id, data) => {
    await axios.patch(`${url}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default ProfileAPI;
