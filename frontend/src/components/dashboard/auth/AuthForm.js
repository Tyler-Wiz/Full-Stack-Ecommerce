"use client";

import Input from "@/components/shared/TextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validators/AuthValidator";
import { loginUser } from "@/store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthForm = () => {
  const { loginError, loginStatus } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <section className="container flex-col mx-auto mt-48 ">
      <div className="w-[30%] mx-auto ">
        <div className="my-6">
          <h2>Welcome back!</h2>
          <p className="text-description mt-3 text-center">
            Login to your admin dashboard to continue
          </p>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="username"
            error={errors.username?.message}
            label="Username"
          />
          <div className="relative">
            <Input
              register={register}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2"
              onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>
          {loginError === "Unauthorized" ? (
            <p className="error-message">Invalid Username or Password</p>
          ) : (
            ""
          )}
          <PrimaryButton
            name={loginStatus === "pending" ? "Loading" : "Login"}
            background="bg-tahiti"
            color="text-white"
          />
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
