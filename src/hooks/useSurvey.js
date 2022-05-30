import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

export const useSurvey = () => {
  const headers = {
    Authorization: `Token ${token}`,
  };

  const submitSurvey = async (datas) => {
    const survey = {
      username: datas[0],
      user_connect: datas[1],
      user_intro: datas[2],
      user_job: datas[3],
      user_pf_addr: datas[4],
      user_skill_name: datas[5],
      user_exp: datas[6],
      user_time: datas[7],
      user_import: datas[8],
      user_how: datas[9],
    };
    const response = await axios.post(
      "http://localhost:8000/survey/collect/",
      survey,
      { headers }
    );
    const data = await response.data;
    return data;
  };

  return {
    submitSurvey,
  };
};
