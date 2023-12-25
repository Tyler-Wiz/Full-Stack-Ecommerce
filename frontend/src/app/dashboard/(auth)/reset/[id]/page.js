import PasswordReset from "@/components/dashboard/auth/PasswordReset";
import React from "react";

const page = ({ params }) => {
  return <PasswordReset id={params.id} />;
};

export default page;
