import React from "react";
import ClientLayout from "../shared/ClientLayout";
import AuthForm from "./AuthForm";
import { loginUser } from "@/store/features/authSlice";
import { loginSchema } from "@/validators/AuthValidator";

const Login = () => {
  return (
    <ClientLayout>
      <AuthForm
        authType="login"
        dispatchAction={loginUser}
        schema={loginSchema}
      />
    </ClientLayout>
  );
};

export default Login;
