"use client";

import Input from "@/components/shared/TextInput";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "@/validators/AuthValidator";
import config from "@/services/config/index";
import axios from "axios";
import Button from "../shared/Button";
import Link from "next/link";

const PasswordReset = ({ id }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const token = await axios.post(
        `${config.RESET_PASSWORD_URL + id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (token.status === 201) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      setSubmitError(error.response.data);
    }
  };

  return (
    <section className="lg:w-[70%] w-[80%] mx-auto my-44 jost text-center ">
      {submitSuccess ? (
        <div className="jost container flex-col w-[30%]">
          <h2 className="mb-3 capitalize"> Success!</h2>
          <p className="text-center mb-6">
            You can log in to your account using your new password
          </p>
          <Link href="/login">
            <Button
              name="login"
              backgroundColor="bg-primary"
              color="text-white"
              width="w-full"
            />
          </Link>
        </div>
      ) : (
        <div className="jost container flex-col">
          <h2 className="mb-3 capitalize"> Create New Password</h2>
          <p className="text-center mb-6">Please enter new password</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto w-full">
            <div className="relative">
              <Input
                register={register}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute top-[30%] right-4"
                onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <Input
              register={register}
              placeholder="confirm Password"
              name="confirmPassword"
              error={errors.confirmPassword?.message}
            />
            {submitError && <p>{submitError.errorMessage}</p>}
            <Button
              name="Change Password"
              backgroundColor="bg-primary"
              color="text-white"
              width="w-full"
            />
          </form>
        </div>
      )}
    </section>
  );
};

export default PasswordReset;
