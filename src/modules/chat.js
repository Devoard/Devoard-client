import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
const SUBMIT_CHAT = "chat/SUBMIT_CHAT";
const SET_USER = "chat/SET_USER";
const LIST_CHAT = "chat/LIST_CHAT";
const LIST_DETAIL_CHAT = "chat/LIST_DETAIL_CHAT";

const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

export const submit_chat = (body) => {
  axios.post("http://localhost:8000/chat/list/", body, { headers });
  return {
    type: SUBMIT_CHAT,
  };
};
export const set_user = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const chat_list = (body) => async () => {
  const response = await axios.get("http://localhost:8000/chat/list/", {
    params: body,
    headers,
  });
  const data = await response.data;
  // const data = [
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung1",
  //     chat_body: "test2",
  //     time_stamp: "2022-03-13T16:57:37.824863+09:00",
  //     read: true,
  //   },
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung2",
  //     chat_body: "test3",
  //     time_stamp: "2022-03-13T17:02:43.228861+09:00",
  //     read: true,
  //   },
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung2",
  //     chat_body: "test1",
  //     time_stamp: "2022-03-10T01:01:00+09:00",
  //     read: true,
  //   },
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung1",
  //     chat_body: "test2",
  //     time_stamp: "2022-03-13T16:57:37.824863+09:00",
  //     read: true,
  //   },
  // ];
  let sortData = await data.map((v, i) => {
    v.time = moment(v.time_stamp).format("YYYYMMDDHHmmss");
    return v;
  });
  sortData.sort((a, b) => {
    return b.time - a.time;
  });
  return {
    type: LIST_CHAT,
    payload: sortData,
  };
};
export const chat_detail_list = (body) => async () => {
  const response = await axios.get("http://localhost:8000/chat/detail/", {
    params: body,
    headers,
  });
  const data = await response.data;
  // const data = [
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung1",
  //     chat_body: "test2",
  //     time_stamp: "2022-03-13T16:57:37.824863+09:00",
  //     read: true,
  //   },
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung2",
  //     chat_body: "test3",
  //     time_stamp: "2022-03-13T17:02:43.228861+09:00",
  //     read: true,
  //   },
  //   {
  //     sender: "dvlops87",
  //     receiver: "Zy0ung2",
  //     chat_body: "test1",
  //     time_stamp: "2022-03-10T01:01:00+09:00",
  //     read: true,
  //   },
  // ];
  let sortData = await data.map((v, i) => {
    v.time = moment(v.time_stamp).format("YYYYMMDDHHmmss");
    return v;
  });
  sortData.sort((a, b) => {
    return b.time - a.time;
  });
  return {
    type: LIST_DETAIL_CHAT,
    payload: sortData,
  };
};

const initialState = {
  allChat: [],
  detailChat: [],
  to_user: "",
};
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, to_user: action.payload };
    case LIST_CHAT:
      return { ...state, allChat: action.payload };
    case LIST_DETAIL_CHAT:
      return { ...state, detailChat: action.payload };
    default:
      return state;
  }
}
