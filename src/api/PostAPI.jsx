import axios from 'axios';
import Cookies from 'universal-cookie';

const url = 'http://localhost:8000/devoard';
// 임시로 설정. 자동 설정 필요
const cookies = new Cookies();
const headers = {
  'Authorization': cookies.get('token')
}

const PostAPI = {
  getPosts: async(state) => {  
    let res = null;
    if (state === 'all') {
      res = await axios.get(`${url}`, { headers })
      .catch(err => {
        console.log(err);
      })
    }
    if (state === 'ongoing') {
      res = await axios.get(`${url}`, {
        params: {
          recruit_state: true
        },
        headers
      })
      .catch(err => {
        console.log(err);
      })
    }
    if (state === 'done') {
      res = await axios.get(`${url}`, {
        params: {
          recruit_state: false
        },
        headers
      }) 
      .catch(err => {
        console.log(err);
      })
    }

    return res.data;
  },
  getDetailPost: async(id) => {
    const res = await axios.get(`${url}/${id}`, { headers })
    .catch(err => {
      console.log(err);
    })

    return res.data;
  },
  createPost: async(data) => {
    await axios.post(`${url}`, data, { headers })
    .catch(err => {
      console.log(err);
    })
  },
  updatePost: async(id, data) => {
    await axios.patch(`${url}/${id}`, data, { headers })
    .catch(err => {
      console.log(err);
    })
  },
  removePost: async(id) => {
    await axios.delete(`${url}/${id}`, { headers })
    .catch(err => {
      console.log(err);
    })
  }
}

export default PostAPI;