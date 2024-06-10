"use client";
import axios from "axios";
import { axiosInstance } from "../_lib/axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      noPhone: "",
      type: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance().post("/user/v2", values);
        Swal.fire({
          icon: "success",
          title: "Success Register",
          text: "Your account has been successfully registered, please check your email to verify!",
        });

        console.log("====================================");
        console.log("Success", response.data);
        console.log("====================================");

        router.push("/login");
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email has been registered",
        });
      }
    },
  });
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card border border-solid border-black p-10">
          <p className="text-center text-4xl">REGISTER</p>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              id="fullName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Full Name"
              onChange={formik.handleChange}
              required
            />
          </div>
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
            <label>No Phone</label>
            <input
              type="text"
              id="noPhone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="081241421"
              onChange={formik.handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              id="type"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={formik.handleChange}
              placeholder="password"
              required
            />
          </div>
          <button
            className=" bg-blue-600 text-white p-2 rounded-lg mt-2"
            onClick={() => formik.handleSubmit()}
            type="submit"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
