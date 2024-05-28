"use client";
import { useFormik } from "formik";
import { useAppDispatch } from "../../hooks";
import { userLogin } from "./_middleware/auth.middleware";
import { TUser } from "./_models/user.mode";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: TUser) => {
    
  });
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card border border-solid border-black p-10">
          <p className="text-center text-4xl">LOGIN</p>
          <form>
            <div>
              <label>Email</label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="youremail@gmail.com"
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password"
                required
              />
            </div>
            <button className=" bg-blue-600 text-white p-2 rounded-lg mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
