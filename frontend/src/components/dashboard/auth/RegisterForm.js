"use client";

import Input from "@/components/shared/TextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/validators/AuthValidator";
import { registerUser } from "@/store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const { registerStatus, registerError } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <section className="h-screen">
      <div className="flex flex-col justify-center items-center max-w-lg mx-auto mt-48">
        <div className="my-6">
          <h2>Register</h2>
          <p className="text-description">Register an account to get started</p>
        </div>
        <form className="self-center" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="username"
            error={errors.username?.message}
            label="Username"
          />
          <Input
            register={register}
            name="email"
            label="Email Address"
            error={errors.email?.message}
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
          {registerError && <p>{registerError}</p>}
          <PrimaryButton
            name={registerStatus == "pending" ? "Loading..." : "Register"}
            background="bg-tahiti"
            color="text-white"
          />
        </form>
        <div className="mt-10">
          <p className="text-description">
            Do you have an account?
            <Link href="/dashboard/login">
              <span className="text-midnight font-bold cursor-pointer ml-2">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
