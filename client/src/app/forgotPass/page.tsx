"use client";

import { useFormik } from "formik";
import { axiosInstance } from "../_lib/axios";

export default function forgotPass() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance().post("/user/sendEmail", values);
        console.log(response);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    },
  });
  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <input id="email" name="email" onChange={formik.handleChange}></input>
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
}
