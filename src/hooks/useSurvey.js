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
      user_field: datas[1],
      user_skill_name: datas[2],
      user_period: datas[3],
      user_active: datas[4],
      user_time: datas[5],
      user_how: datas[6],
      user_exp: datas[7],
      user_import: datas[8],
      user_intro: datas[9],
      user_plan: datas[10],
      user_tmi: datas[11],
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
