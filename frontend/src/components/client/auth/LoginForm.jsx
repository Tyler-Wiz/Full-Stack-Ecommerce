"use client";

import Input from "@/components/shared/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validators/AuthValidator";
import { loginUser } from "@/store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/Button";
import axios from "axios";
import config from "@/services/config/index";

const LoginForm = () => {
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

  const googleAuth = () => {
    window.open(`${config.GOOGLE_LOGIN_URL}`, "_self");
  };

  return (
    <section className="container">
      <section className="mx-auto w-full flex flex-col justify-center items-center">
        <div className="montserrat w-[40%] p-12 rounded-xl">
          <div className="">
            <h3 className="text-xl font-bold text-center">Welcome back!</h3>
            <p className="text-description text-center mb-3">
              Please login to your account to continue
            </p>
          </div>
          <form className="self-center" onSubmit={handleSubmit(onSubmit)}>
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
              {errors.password?.message ? (
                ""
              ) : (
                <button
                  type="button"
                  className="absolute right-3 top-1/2"
                  onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              )}
            </div>
            {loginError === "Unauthorized" ? (
              <p className="error-message">Invalid Username or Password</p>
            ) : (
              ""
            )}
            <Button
              name={loginStatus === "pending" ? "Loading" : "Login"}
              width="w-full"
              backgroundColor="bg-primary"
              color="text-white"
            />
          </form>
          <div className="my-3">
            <button
              className={` w-full text-primary bg-white border-[1px] border-black px-4 py-3 text-xs montserrat capitalize flex items-center justify-center gap-2`}
              onClick={googleAuth}>
              <FaGoogle size={20} />
              <p className="text-gray-500">Continue with Google</p>
            </button>
          </div>
          <Link href="/forgot">
            <p
              className="capitalize text-black font-bold text-center
                cursor-pointer mt-6"
              aria-label="forgot-button">
              forgot password?
            </p>
          </Link>
          <div className="mt-5 text-center">
            <p className="text-description">
              Don't have an account?
              <Link href="/register">
                <span className="text-midnight font-bold cursor-pointer ml-2">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LoginForm;
