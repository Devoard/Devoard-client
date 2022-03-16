import { combineReducers } from "redux";
import user from "./user";
import chat from "./chat";
import survey from "./servey";
import project from "./project";
const rootReducer = combineReducers({
  user,
  chat,
  survey,
  project,
});
export default rootReducer;
