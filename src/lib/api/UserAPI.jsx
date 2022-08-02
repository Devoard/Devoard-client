import axios from "axios";

const url = "http://localhost:8000/user";

const ProfileAPI = {
  updateUserData: async (id, data) => {
    await axios
      .patch(`${url}_info/${id}`, data)
      .catch((err) => console.log(err));
  },
  logOut: async () => {
    await axios.get(`${url}/logout`);
  },
};

export default ProfileAPI;
