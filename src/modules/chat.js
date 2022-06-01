import ChatAPI from "../lib/api/ChatAPI";

const SET_USER = "chat/SET_USER";
const LIST_CHAT = "chat/LIST_CHAT";
const LIST_DETAIL_CHAT = "chat/LIST_DETAIL_CHAT";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const chatList = (body) => async () => {
  const data = await ChatAPI.getChatList(body);
  return {
    type: LIST_CHAT,
    payload: data,
  };
};

export const chatDetailList = (body) => async () => {
  const data = await ChatAPI.chatDetailList(body);
  return {
    type: LIST_DETAIL_CHAT,
    payload: data,
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
