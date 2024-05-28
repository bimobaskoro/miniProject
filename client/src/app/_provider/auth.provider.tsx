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

  const fetchUser = async () => await dispatch(keepLogin());

  useEffect(() => {
    fetchUser();
  }, []);

  return children;
}
