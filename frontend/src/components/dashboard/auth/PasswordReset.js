"use client";

import Input from "@/components/shared/TextInput";
import PrimaryButton from "@/components/shared/PrimaryButton";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "@/validators/AuthValidator";
import config from "@/services/config/index";
import axios from "axios";

const PasswordReset = ({ id }) => {
  const [mailSent, setMailSent] = useState(false);
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
        setMailSent(true);
      }
    } catch (error) {
      setSubmitError(error.response.data);
    }
  };

  return (
    <section className="flex justify-center items-center ">
      {mailSent ? (
        <>p</>
      ) : (
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto mt-48">
          <h2 className="mb-3 capitalize"> Reset your password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-6">
              <button
                type="button"
                className="absolute top-[50%] right-4"
                onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
              <Input
                register={register}
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                error={errors.password?.message}
              />
            </div>
            <Input
              register={register}
              label="Confirm Password"
              name="confirmPassword"
              error={errors.confirmPassword?.message}
            />
            {submitError && <p>{submitError.errorMessage}</p>}
            <PrimaryButton
              name="Change Password"
              background="bg-tahiti"
              color="text-white"
              width="w-[400px]"
            />
          </form>
        </div>
      )}
    </section>
  );
};

export default PasswordReset;
