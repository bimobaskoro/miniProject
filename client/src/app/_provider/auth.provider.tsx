"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { getValidAuthTokens } from "../_lib/cookies";
import { TUser } from "../_models/user.mode";
import { keepLogin } from "../_middleware/auth.middleware";

export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { data } = getValidAuthTokens();

  const fetchUser = async (storage: TUser) =>
    await dispatch(keepLogin(storage));

  useEffect(() => {
    if (data) fetchUser(data);
  }, [data]);

  return children;
}
