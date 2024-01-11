"use client";

import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Register from "@/components/client/auth/Register";

const page = () => {
  const { token } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (token) {
      redirect("/");
    }
  }, [token]);
  return <Register />;
};

export default page;
