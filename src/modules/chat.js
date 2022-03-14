import axios from "axios";
import Cookies from "universal-cookie";

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

export const chat_list = (body) => {
  const response = axios.get("http://localhost:8000/chat/list/", {
    params: body,
    headers,
  });
  const data = response.data;
  return {
    type: LIST_CHAT,
    // payload: data,
  };
};
export const chat_detail_list = (body) => {
  const response = axios.get("http://localhost:8000/chat/detail/", {
    params: body,
    headers,
  });
  const data = response.data;
  return {
    type: LIST_DETAIL_CHAT,
    // payload: data,
  };
};
const initialState = {
  allChat: [
    {
      from: "사용자1사용자1사용자1사용자1",
      content:
        "지수님 안녕하세요지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: true,
    },
    {
      from: "사용자2",
      content: "지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자2",
      content: "성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자2",
      content: "다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자5",
      content: "지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: true,
    },
    {
      from: "사용자6",
      content: "지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자7",
      content: "성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자8",
      content: "다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자9",
      content: "지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: true,
    },
    {
      from: "사용자10",
      content: "지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자11",
      content: "성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자12",
      content: "다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자13",
      content: "지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: true,
    },
    {
      from: "사용자14",
      content: "지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자15",
      content: "성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자16",
      content: "다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자17",
      content: "지수님 안녕하세요?지수님 안녕하세요?지수님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: true,
    },
    {
      from: "사용자18",
      content: "지영님 안녕하세요?지영님 안녕하세요?지영님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자19",
      content: "성현님 안녕하세요?성현님 안녕하세요?성현님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
    {
      from: "사용자사용자20",
      content:
        "다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?다혜님 안녕하세요?",
      date: "2022-02-10 11:19",
      isRead: false,
    },
  ],
  detailChat: [],
  to_user: "",
};
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, to_user: action.payload };
    case LIST_CHAT:
    // return { ...state, allChat: action.payload };
    case LIST_DETAIL_CHAT:
    // return { ...state, detailChat: action.payload };
    default:
      return state;
  }
}
