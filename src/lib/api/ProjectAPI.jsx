import axios from "axios";
import Cookies from "universal-cookie";

const url = "http://localhost:8000/project";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const ProjectAPI = {
  getMakedList: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/my_project/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    // result = [
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
    return result;
  },

  getJoinList: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/join_project/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    // result = [
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
    return result;
  },

  getApplyProject: async (body) => {
    let result = null;
    const res = await axios
      .get(`${url}/apply_project/`, {
        params: body,
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;

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

    return result;
  },

  getProject: async (project_id) => {
    let result = null;
    const res = await axios
      .get(`${url}/detail/`, {
        params: {
          project_id,
        },
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  acceptAwaiter: async (username, p_id, select_awaiter) => {
    const body = {
      username,
      p_id,
      select_awaiter,
    };
    let result = null;
    const res = await axios
      .post(`${url}/access_awaiter/`, body, {
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },

  rejectAwaiter: async (username, p_id, select_awaiter) => {
    const body = {
      username,
      p_id,
      select_awaiter,
    };
    let result = null;
    const res = await axios
      .post(`${url}/reject_awaiter/`, body, {
        headers,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) result = res.data;
    return result;
  },
};

export default ProjectAPI;
