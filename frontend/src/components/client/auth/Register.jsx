import React from "react";
import ClientLayout from "../shared/ClientLayout";
import AuthForm from "./AuthForm";
import { registerUser } from "@/store/features/authSlice";
import { registerSchema } from "@/validators/AuthValidator";

const Register = () => {
  return (
    <ClientLayout>
      <AuthForm
        authType="register"
        dispatchAction={registerUser}
        schema={registerSchema}
      />
    </ClientLayout>
  );
};

export default Register;
