"use client";

import Login from "@/components/client/auth/Login";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

const page = () => {
  const { token } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (token) {
      redirect("/");
    }
  }, [token]);
  return <Login />;
};

export default page;
