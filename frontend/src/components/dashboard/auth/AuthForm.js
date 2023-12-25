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
    <section className="h-screen">
      <div className="flex flex-col justify-center items-center max-w-lg mx-auto mt-48">
        <div className="my-6">
          <h2>Welcome back!</h2>
          <p className="text-description">
            Login to your admin dashboard to continue
          </p>
        </div>
        <form className="self-center" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="username"
            error={errors.username?.message}
            label="Username"
          />
          <div className="my-2 text-sm relative">
            <button
              type="button"
              className="absolute top-[50%] right-4"
              onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
            <Input
              register={register}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
            />
          </div>
          {loginError === "Unauthorized" ? (
            <p>Invalid Username or Password</p>
          ) : (
            ""
          )}
          <PrimaryButton
            name="Login"
            background="bg-tahiti"
            color="text-white"
          />
        </form>
        <Link href="/dashboard/forgot-password">
          <p
            className="capitalize text-midnight font-bold text-center
                cursor-pointer mt-6"
            aria-label="forgot-button">
            forgot password?
          </p>
        </Link>
        <div className="mt-10">
          <p className="text-description">
            Don't have an account?
            <Link href="/dashboard/register">
              <span className="text-midnight font-bold cursor-pointer ml-2">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
