"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { logout } from "../_lib/redux/slice/user.slice";

export default function ComponentHome() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      {user.id ? (
        <>
          <div>Welcome, {user.email}</div>
          <button
            className="bg-blue-600 p-2"
            onClick={() => {
              deleteCookie("access_token");
              deleteCookie("refresh_token");
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <a href="/login">
            <button className="bg-blue-600 p-2">Login</button>
          </a>
          <a href="/register">
            <button className="ml-5 bg-blue-600 p-2">Register</button>
          </a>
        </>
      )}
    </>
  );
}
