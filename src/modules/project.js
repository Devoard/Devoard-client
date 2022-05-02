import axios from "axios";
import Cookies from "universal-cookie";
const JOIN_PROJECT = "project/JOIN_PROJECT";
const MAKED_PROJECT = "project/MAKED_PROJECT";
const APPLY_PROJECT = "project/APPLY_PROJECT";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

export const getMakedList = (body) => async (dispatch) => {
  const response = await axios.get(
    "http://localhost:8000/project/my_project/",
    {
      params: body,
      headers,
    }
  );
  const data = await response.data;
  // const data = [
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
  // ];
  dispatch({ type: MAKED_PROJECT, payload: data });
};
export const getJoinList = (body) => async (dispatch) => {
  const response = await axios.get(
    "http://localhost:8000/project/join_project/",
    {
      params: body,
      headers,
    }
  );
  const data = await response.data;
  // const data = [
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
  // ];
  dispatch({ type: JOIN_PROJECT, payload: data });
};

export const getApplyProject = (body) => async (dispatch) => {
  const response = await axios.get(
    "http://localhost:8000/project/apply_project/",
    {
      params: body,
      headers,
    }
  );
  const data = await response.data;
  // const data = [
  //   {
  //     project_detail: "tq",
  //     team_master: {
  //       username: "dvlops87",
  //       user_field: "백엔드",
  //       user_exp: "경험 있음",
  //       user_import: "실력,일정,기능",
  //       user_connect: "tjdgus917@naver.com",
  //       user_pf_addr: "github/dvlops87",
  //       u_skill: [
  //         {
  //           user_skill_name: "Django",
  //           user_score: 0,
  //         },
  //         {
  //           user_skill_name: "Express",
  //           user_score: 0,
  //         },
  //         {
  //           user_skill_name: "Koa",
  //           user_score: 0,
  //         },
  //       ],
  //     },
  //     joiner: [
  //       {
  //         username: "dvlops87",
  //         user_field: "백엔드",
  //         user_exp: "경험 있음",
  //         user_import: "실력,일정,기능",
  //         user_connect: "tjdgus917@naver.com",
  //         user_pf_addr: "github/dvlops87",
  //         u_skill: [
  //           {
  //             user_skill_name: "Django",
  //             user_score: 0,
  //           },
  //           {
  //             user_skill_name: "Express",
  //             user_score: 0,
  //           },
  //           {
  //             user_skill_name: "Koa",
  //             user_score: 0,
  //           },
  //         ],
  //       },
  //     ],
  //     awaiter: [
  //       {
  //         username: "Zy0ung",
  //         user_field: "프론트엔드",
  //         user_exp: "경험 없음",
  //         user_import: "기능",
  //         user_connect: "Zy0ung@gmail.com",
  //         user_pf_addr: "github/Zy0ung",
  //         u_skill: [
  //           {
  //             user_skill_name: "React",
  //             user_score: 0,
  //           },
  //           {
  //             user_skill_name: "Flask",
  //             user_score: 0,
  //           },
  //         ],
  //       },
  //     ],
  //     id: 1,
  //   },
  // ];
  dispatch({
    type: APPLY_PROJECT,
    payload: data,
  });
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
