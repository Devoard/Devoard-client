import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:8000/survey";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const SurveyAPI = {
  submitSurvey: async (datas) => {
    const body = {
      username: datas[0],
      user_connect: datas[1],
      user_intro: datas[2],
      user_job: parseInt(datas[3]),
      user_pf_addr: datas[4],
      user_skill_name: datas[6],
      user_exp: datas[7],
      user_time: datas[8],
      user_import: datas[9],
      user_how: datas[10],
    };
    let result = null;
    const res = await axios
      .post(`${url}/collect/`, body, {
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },
};

export default SurveyAPI;
