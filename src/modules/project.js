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
