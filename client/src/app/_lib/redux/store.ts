import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";

const reducer = combineReducers({
  auth: userSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
