import axios from 'axios';

const url = 'http://localhost:8000/profile';

const ProfileAPI = {
  createProfileData: async(data) => {
    axios.post(url, data)
    .catch((err)=> 
      console.log(err)
    )
  }
};

export default ProfileAPI;