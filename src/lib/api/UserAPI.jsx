import axios from 'axios';

const url = 'http://localhost:8000/user_info';


const ProfileAPI = {
  updateUserData: async(id, data) => {
    await axios.patch(`${url}/${id}`, data)
    .catch((err) => 
      console.log(err)
    )
  }
};

export default ProfileAPI;