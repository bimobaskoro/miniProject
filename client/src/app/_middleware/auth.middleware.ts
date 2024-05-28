import { Dispatch } from "@reduxjs/toolkit";
import { axiosInstance } from "../_lib/axios";
import { TUser } from "../_models/user.mode";
import { login } from "../_lib/redux/slice/user.slice";
import { setAuthCookie } from "../_lib/cookies";
import { deleteCookie } from "cookies-next";
import axios from "axios";

export const userLogin = ({ email, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const rest = await axiosInstance().get("/user/v1", {
        params: { email, password },
      });
      const user = rest.data[0];
      console.log(user);

      if (user.id) {
        dispatch(login(user));
        setAuthCookie(JSON.stringify(user), "auth");
      }
      return;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        deleteCookie("auth");
        alert("wrong email/password");
        return err.message;
      }
    }
  };
};

export const keepLogin = (storage: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axiosInstance().get("/user/v", {
        params: { email: storage.email },
      });
      const user = res.data[0];
      console.log(user);

      if (user.id) {
        dispatch(login(user));
      }
      return;
    } catch (err: any) {
      deleteCookie("auth");
      alert("wrong email/password");

      return err.message;
    }
  };
};
