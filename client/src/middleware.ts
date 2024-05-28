import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "./app/_utils/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refresh_token")?.value || "";
  const response = NextResponse.next();

  const res = await axiosInstance()
    .get("users/validate", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    .then(async (res) => {
      response.cookies.set("access_token", res.data.access_token);
      return res.data;
    })
    .catch((err) => {
      return false;
    });

  const validate = res.message == "success" ? true : false;

  const is_verified = res.is_verified;

  if (validate && !is_verified && pathname)
}
