import axios from 'axios';

const url = 'http://localhost:8000/profile';

const ProfileAPI = {
  createProfileData: async(data) => {
    await axios.post(url, data)
    .catch((err) => 
      console.log(err)
    )
  },
  getProfileData: async(id) => {
    const res = await axios.get(`${url}/${id}`)
    .catch((err) => 
      console.log(err)
    )

    return res.data;
  },
  updateProfileData: async(id, data) => {
    await axios.patch(`${url}/${id}`, data)
    .catch((err) => 
      console.log(err)
    )
  }
};

export default ProfileAPI;