"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useAppSelector } from "../../hooks";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { logout } from "./_lib/redux/slice/user.slice";
export default function HomeUser() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
          {user.id ? (
            <>
              <div> welcome, {user.email}</div>
              <button
                className=" bg-blue-600 p-2"
                onClick={() => {
                  deleteCookie("access_token");
                  deleteCookie("refresh_token");
                  dispatch(logout());
                }}
              >
                logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">
                <button className=" bg-blue-600 p-2">login</button>
              </a>
              <a href="/register">
                <button className="ml-5 bg-blue-600 p-2 ">register</button>
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
