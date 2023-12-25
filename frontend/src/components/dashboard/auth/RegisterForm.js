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
  const { loginError, loginStatus, token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_admin: 1, // Set default value for the checkbox
    },
    resolver: yupResolver(registerSchema),
  });
  const watchedCheckboxValue = watch("is_admin");

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    let is_admin = 0;
    if (data.is_admin) {
      is_admin = 1;
    }
    const formData = { ...data, is_admin };
    dispatch(registerUser(formData));
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
          <label className="inline-flex items-center mt-4">
            <input
              className="hidden"
              type="checkbox"
              {...register("is_admin")}
            />
            <span className="relative inline-block w-6 h-6 border-2 border-gray-400 rounded-md transition duration-300">
              <span
                className={`${
                  watchedCheckboxValue ? "opacity-100" : "opacity-0"
                } absolute inset-0 flex items-center justify-center transition duration-300`}>
                <svg
                  className="w-4 h-4 text-green-500 fill-current"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
            </span>
            <span className="ml-2 text-gray-700">Admin</span>
          </label>
          <PrimaryButton
            name="Register"
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
