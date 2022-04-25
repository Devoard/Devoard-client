import axios from "axios";
import Cookies from "universal-cookie";
const JOIN_PROJECT = "project/JOIN_PROJECT";
const MAKED_PROJECT = "project/MAKED_PROJECT";
const APPLY_PROJECT = "project/APPLY_PROJECT";
const DETAIL_PROJECT = "project/DETAIL_PROJECT";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

export const getMakedList = (body) => async () => {
  const response = await axios.get(
    "http://localhost:8000/project/my_project/",
    {
      params: body,
      headers,
    }
  );
  const data = await response.data;
  return {
    type: MAKED_PROJECT,
    payload: data,
    // payload: [
    //   {
    //     title: "8",
    //     field: "django,react,android,next.js,express,mongodb",
    //     body: "설명설명",
    //     done: "진행중",
    //     user_id: "팀장",
    //     id: 1,
    //   },
    //   {
    //     title: "9",
    //     field: "django,react,android,next.js,express,mongodb",
    //     body: "설명설명설명설설명설명설명설명설명설명",
    //     done: "진행중",
    //     user_id: "팀장",
    //     id: 2,
    //   },
    //   {
    //     title: "10",
    //     field: "django,react,android,next.js,express,mongodb",
    //     body: "설명설명설명설설명설명설명설명설명설명",
    //     done: "진행중",
    //     user_id: "팀장",
    //     id: 3,
    //   },
    // ],
  };
};
export const getJoinList = (body) => async () => {
  const response = await axios.get(
    "http://localhost:8000/project/join_project/",
    {
      params: body,
      headers,
    }
  );
  const data = await response.data;
  return {
    type: MAKED_PROJECT,
    payload: data,
    // payload: [
    //   {
    //     project_detail: {
    //       title: "3",
    //       field: "django,android,next.js,express,mongodb",
    //       body: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    //       done: "진행중",
    //       user_id: "유저아이듸",
    //     },
    //     team_master: "팀장",
    //     joiner: ["지영", "다혜", "지수", "성현"],
    //     id: 3,
    //   },
    // ],
  };
};

export const getDetailProject = (body) => async () => {
  // const response = await axios.get(
  //   "http://localhost:8000/project/detail/",
  //   {
  //     params: body,
  //     headers,
  //   }
  // );
  // const data = await response.data;
  return {
    type: DETAIL_PROJECT,
    // payload: data,
    payload: {
      title: "세번째 극비 프로젝트",
      frontend_cnt: 2,
      backend_cnt: 3,
      android_cnt: 2,
      ios_cnt: 1,
      data_cnt: 0,
      devops_cnt: 2,
      field: "Django, React, Android",
      body: "극비입니다",
      period: "1개월~3개월",
      done: "진행중",
      user_id: 6,
    },
  };
};

const initialState = {
  projectList: [],
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_PROJECT:
      return { ...state, projectList: action.payload };
    case MAKED_PROJECT:
      return { ...state, projectList: action.payload };
    case APPLY_PROJECT:
      return { ...state, projectList: action.payload };
    default:
      return state;
  }
}
