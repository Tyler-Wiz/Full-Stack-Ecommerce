"use client";

import React, { useLayoutEffect } from "react";
import AuthForm from "@/components/dashboard/auth/AuthForm";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

const page = () => {
  const { token } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (token) {
      redirect("/dashboard");
    }
  }, [token]);
  return <AuthForm />;
};

export default page;
