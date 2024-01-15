"use client";

import Input from "@/components/shared/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validators/AuthValidator";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/Button";
import config from "@/services/config/index";

const AuthForm = ({ authType, dispatchAction, schema }) => {
  const { loginError, loginStatus, registerStatus, registerError } =
    useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    delete data.confirmPassword;
    dispatch(dispatchAction(data));
  };

  const googleAuth = () => {
    window.open(`${config.GOOGLE_LOGIN_URL}`, "_self");
  };

  return (
    <section className="lg:container">
      <section className="lg:mx-auto w-full flex flex-col justify-center lg:items-center">
        <div className="montserrat lg:w-[45%] p-12 rounded-xl">
          <div className="">
            <h3 className="text-xl font-bold text-center">
              {authType === "login" ? "Welcome back!" : "Register"}
            </h3>
            <p className="text-description text-center mb-3">
              {authType === "login"
                ? "Please login to your account to continue"
                : "Please register an account to continue"}
            </p>
          </div>
          <form
            className="self-center"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="auth-form">
            <Input
              register={register}
              name="username"
              error={errors.username?.message}
              label="Username"
              aria-label="username"
            />
            {authType === "register" && (
              <Input
                register={register}
                name="email"
                error={errors.email?.message}
                label="email"
                aria-label="email"
              />
            )}
            <div className="relative">
              <Input
                register={register}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                error={errors.password?.message}
                aria-label="password"
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
            {authType === "register" && (
              <Input
                register={register}
                label="confirm Password"
                name="confirmPassword"
                error={errors.confirmPassword?.message}
                aria-label="confirm-password"
              />
            )}
            {loginError === "Unauthorized" ? (
              <p className="error-message">Invalid Username or Password</p>
            ) : (
              ""
            )}
            {registerError ? (
              <p className="error-message my-3">{registerError.errorMessage}</p>
            ) : (
              ""
            )}
            <Button
              name={
                loginStatus || registerStatus === "pending"
                  ? "Loading"
                  : authType === "login"
                  ? "Sign In"
                  : "Register"
              }
              width="w-full"
              backgroundColor="bg-primary"
              color="text-white"
              aria-label="submit-button"
            />
          </form>
          <div className="my-3">
            <button
              className={` w-full text-primary bg-white border-[1px] border-black px-4 py-3 text-xs montserrat capitalize flex items-center justify-center gap-2`}
              onClick={googleAuth}>
              <FcGoogle size={20} />
              <p className="text-gray-500">
                {authType === "login"
                  ? "Sign In with Google"
                  : "Continue with Google"}
              </p>
            </button>
          </div>
          {/* If the authType is login, show the forgot password link */}
          {authType === "login" && (
            <Link href="/forgot">
              <p
                className="capitalize text-black font-bold text-center
                cursor-pointer mt-6"
                aria-label="forgot-button">
                forgot password?
              </p>
            </Link>
          )}
          <div className="mt-5 text-center">
            <p className="text-description">
              {authType === "login"
                ? "Don't have an account?"
                : "Do you have an account?"}
              <Link href={authType === "login" ? "/register" : "/login"}>
                <span className="text-midnight font-bold cursor-pointer ml-2">
                  {authType === "login" ? "Sign Up" : "Sign In"}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AuthForm;
