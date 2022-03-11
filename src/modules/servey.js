import axios from "axios";

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
  console.log("survey:", survey);
  const headers = {
    Authorization: "Token 1e7a973a7b5239e32330a1a71c72019713dec43f",
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
  console.log("페이로드", action.payload);
  switch (action.type) {
    case SUBMIT_SURVEY:
      return { ...state, survy: action.payload };
    default:
      return state;
  }
}
