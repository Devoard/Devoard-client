import axios from 'axios';

const url = 'http://localhost:8000/profile';


const ProfileAPI = {
  getProfileData: async(id) => {
    let result = null;
    const res = await axios.get(`${url}/${id}`)
    .catch((err) => {
      console.log(err);
    })

    if (res) result = res.data;

    return result;
  },
  updateProfileData: async(id, data) => {
    await axios.patch(`${url}/${id}`, data)
    .catch((err) => 
      console.log(err)
    )
  },
  updateProfileImg: async(id, data) => {
    await axios.patch(`${url}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
};

export default ProfileAPI;