"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "@/app/_lib/axios";
import { useRouter } from "next/navigation";

export default function ForgotPass() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      console.error("Token not found in URL");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      if (!token) {
        console.error("Token is not available");
        return;
      }

      try {
        const response = await axiosInstance().post(
          `/user/forgotPassword/${token}`,
          values
        );
        console.log(response);
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card border border-solid border-black p-10 bg-black w-screen h-screen bg-opacity-50">
        <p className="text-center text-4xl">Reset Your Password</p>
        <form onSubmit={formik.handleSubmit}>
          <label>New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-2"
            disabled={!token}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
