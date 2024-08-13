import { combineReducers } from "@reduxjs/toolkit";
import MainReducer from "../screens/redux/reducers";
import { loginReducer } from "../screens/auth/redux/reducer";
import { utilityReducer } from "../screens/utilityScreen/redux/reducer";
import { MainScreenReducer } from "../screens/home/redux/reducer";
import { FindPostScreenReducer } from "../screens/postDetails/redux/reducer";
import ProfileReducer from "../screens/profile/redux/reducer";
import postReducer from "../screens/addpost/redux/reducer";
export const rootReducer = combineReducers({
  mainreducer: MainReducer,
  loginreducer: loginReducer,
  utilityReducer,
  MainScreenReducer,
  FindPostScreenReducer,
  ProfileReducer,
  postReducer,
});
export const getRootReducer = () => rootReducer;
