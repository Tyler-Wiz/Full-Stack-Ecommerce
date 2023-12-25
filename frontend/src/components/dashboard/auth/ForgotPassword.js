"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/shared/TextInput";
import { usernameSchema } from "@/validators/AuthValidator";
import config from "@/services/config/index";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = () => {
  const [mailSent, setMailSent] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(usernameSchema),
  });

  const onSubmit = async (data) => {
    try {
      const token = await axios.post(`${config.FORGOT_PASSWORD_URL}`, data, {
        withCredentials: true,
      });
      if (token.status === 200) {
        setMailSent(true);
      }
    } catch (error) {
      setSubmitError(error.response.data);
    }
  };

  return (
    <section className="flex justify-center items-center ">
      {mailSent ? (
        <div className="flex flex-col w-[30%] justify-center items-center max-w-lg mx-auto mt-48">
          <h2 className="mb-3 capitalize"> Password Reset Mail Sent</h2>
          <p className="text-description text-center mb-10">
            Please check your email for further instructions on how to reset
            your password
          </p>
          <Image src="/mail.png" width={200} height={200} alt="mail image" />
          <Link href="/dashboard/login">
            <h2 className="text-midnight font-bold cursor-pointer my-10">
              Sign In
            </h2>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col w-[30%] justify-center items-center max-w-lg mx-auto mt-48">
          <h2 className="mb-3 capitalize"> Set or reset your password</h2>
          <p className="text-description text-center mb-10">
            Enter username associated with your account. We’ll email you
            instructions on how to set or reset your password.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center">
            <Input
              register={register}
              name="username"
              label="Username"
              error={errors.username?.message}
            />
            {submitError && <p>{submitError.errorMessage}</p>}
            <PrimaryButton
              name="Send Email"
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

export default ForgotPassword;
