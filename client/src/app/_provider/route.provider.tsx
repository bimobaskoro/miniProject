"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import { getValidAuthTokens } from "../_lib/cookies";
import { deleteCookie, getCookie } from "cookies-next";
import { setRouteCookie } from "../_lib/cookies";
export default function RouteProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { push } = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const guestOnlyPaths = ["/"];
  const needLoginPaths = ["/home"];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    const { data } = getValidAuthTokens();

    if (guestOnlyPaths.find((path) => path == pathname) && data) {
      const path = getCookie("path");
      if (path) {
        push(path);
        deleteCookie("path");
      } else push("/home");
    } else if (
      needLoginPaths.find((path) => {
        if (path != "/home" && pathname.includes(path)) return path;
        else if (pathname == path) return pathname;
      }) &&
      !data
    ) {
      setRouteCookie(pathname);
      push("/");
    } else {
      setIsLoading(false);
    }
  }, [pathname, auth]);

  if (isLoading) return <></>;
  return children;
}
