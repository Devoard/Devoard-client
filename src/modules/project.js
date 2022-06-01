import ProjectAPI from "../lib/api/ProjectAPI";

const TAB_MENU = "project/TAB_MENU";
const JOIN_PROJECT = "project/JOIN_PROJECT";
const MAKED_PROJECT = "project/MAKED_PROJECT";
const APPLY_PROJECT = "project/APPLY_PROJECT";

export const setProjectTabMenu = (data) => {
  return {
    type: TAB_MENU,
    payload: data,
  };
};

export const getMakedList = (body) => async (dispatch) => {
  const data = await ProjectAPI.getMakedList(body);
  dispatch({ type: MAKED_PROJECT, payload: data });
};

export const getJoinList = (body) => async (dispatch) => {
  const data = await ProjectAPI.getJoinList(body);
  dispatch({ type: JOIN_PROJECT, payload: data });
};

export const getApplyProject = (body) => async (dispatch) => {
  const data = await ProjectAPI.getApplyProject(body);
  dispatch({
    type: APPLY_PROJECT,
    payload: data,
  });
};

const initialState = {
  projectList: [],
  projectTabMenu: "내가 소속된 프로젝트",
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_PROJECT:
      return { ...state, projectList: action.payload };
    case MAKED_PROJECT:
      return { ...state, projectList: action.payload };
    case APPLY_PROJECT:
      return { ...state, projectList: action.payload };
    case TAB_MENU:
      return { ...state, projectTabMenu: action.payload };
    default:
      return state;
  }
}
