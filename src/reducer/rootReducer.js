import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import profileSlice from "../slices/profileSlice";
import viewCourseSlice from "../slices/courseSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  profile: profileSlice,
  course:viewCourseSlice,
});

export default rootReducer;
