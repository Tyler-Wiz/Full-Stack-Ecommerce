"use client";

import React, { useState } from "react";
import AuthForm from "./AuthForm";

const Auth = ({ formType }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    is_admin: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  return (
    <div className="flex justify-between">
      <div className="h-screen w-[55%] bg-hero bg-cover bg-center"></div>
      <AuthForm
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
        formData={formData}
        handleChange={handleChange}
        formType={formType}
      />
    </div>
  );
};

export default Auth;
