"use client";
import { useFormik } from "formik";
import { userLogin } from "../_middleware/auth.middleware";
import { TUser } from "../_models/user.mode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../_lib/redux/store";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    } as TUser,
    onSubmit: async (values: TUser) => {
      try {
        setIsLoading(true);
        await userLogin(values)(dispatch);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    },
  });
  useEffect(() => {
    console.log(user.type);
    if (user.type == "user") {
      router.push("/");
    } else if (user.type == "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card border border-solid border-black p-10">
          <p className="text-center text-4xl">LOGIN</p>
          <div>
            <label>Email</label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="youremail@gmail.com"
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
              required
            />
          </div>
          <button
            className=" bg-blue-600 text-white p-2 rounded-lg mt-2"
            onClick={() => formik.handleSubmit()}
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
