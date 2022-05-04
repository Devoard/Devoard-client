import { combineReducers } from "redux";
import user from "./user";
import chat from "./chat";
import project from "./project";

const rootReducer = combineReducers({
  user,
  chat,
  project,
});

export default rootReducer;
