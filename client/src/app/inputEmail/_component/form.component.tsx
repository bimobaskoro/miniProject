"use client";

import { useFormik } from "formik";
import { axiosInstance } from "@/app/_lib/axios";

export default function FormComponent() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance().post("/user/sendEmail", values);
        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  // Log formik values.email whenever it changes
  console.log("Email value:", formik.values.email);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card border border-solid border-black p-10 bg-black w-screen h-screen bg-opacity-50">
        <p className="text-center text-4xl">Input Your Email</p>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            name="email"
            value={formik.values.email}
            type="email"
            onChange={formik.handleChange}
            className="border text-black border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
