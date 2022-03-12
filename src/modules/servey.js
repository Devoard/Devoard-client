import axios from "axios";
import Cookies from "universal-cookie";

const SUBMIT_SURVEY = "survey/SUBMIT_SURVEY";

export const submit_survey = (datas) => {
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
    user_git_id: datas[12],
  };
  const cookies = new Cookies();
  const token = cookies.get("token");

  const headers = {
    Authorization: token,
  };
  axios
    .post("http://localhost:8000/survey/collect/", survey, { headers })
    .then((res) => {
      console.log(res.data);
    });
  return {
    type: SUBMIT_SURVEY,
    payload: survey,
  };
};

const initialState = {
  survey: {},
};
export default function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return { ...state, survy: action.payload };
    default:
      return state;
  }
}
