import { Dispatch } from "@reduxjs/toolkit";
import { axiosInstance } from "../_lib/axios";
import { TUser } from "../_models/user.mode";
import { login } from "../_lib/redux/slice/user.slice";
import { setAuthCookie } from "../_lib/cookies";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const userLogin = ({ email, password }: TUser) => {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance().post(
        "/user/v1",
        {
          email: email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const access_token = getCookie("access_token") || "";
      if (access_token) {
        const user: TUser = jwtDecode(access_token);
        dispatch(login(user));
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

export const keepLogin = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getCookie("access_token");
      if (!token) throw new Error("token not found");

      const user = jwtDecode(token) as TUser;

      if (user.id) {
        dispatch(login(user));
      }
      return {
        success: true,
        message: "success",
      };
    } catch (err: any) {
      deleteCookie("auth");
      alert("wrong email/password");

      return err.message;
    }
  };
};
