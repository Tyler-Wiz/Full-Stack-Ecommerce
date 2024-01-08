"use client";

import ClientLayout from "../shared/ClientLayout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/shared/TextInput";
import { usernameSchema } from "@/validators/AuthValidator";
import config from "@/services/config/index";
import axios from "axios";
import Button from "../shared/Button";

const ForgotPassword = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(usernameSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = await axios.post(`${config.FORGOT_PASSWORD_URL}`, data, {
        withCredentials: true,
      });
      if (token.status === 200) {
        setSubmitSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setSubmitError(error.response.data);
    }
  };
  return (
    <ClientLayout>
      <section className="container my-44 jost">
        {submitSuccess ? (
          <div className="mx-auto w-[30%]">
            <h2 className="mb-3 text-5xl capitalize">Check your mail</h2>
            <p className=" text-secondary my-3">
              We have sent an email to your email address. Click the link in the
              email to reset your password.
            </p>
            <p className=" text-secondary">
              Did not receive the email? Check your spam folder or try
              <span className=" text-primary mx-2">another username</span>
            </p>
          </div>
        ) : (
          <div className="mx-auto w-[30%]">
            <h2 className="mb-3 capitalize"> Set or reset your password</h2>
            <p className="text-description text-center mb-10">
              Enter username associated with your account. We’ll email you
              instructions on how to set or reset your password.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-lg mx-auto w-full">
              <Input
                register={register}
                name="username"
                placeholder="Username"
                error={errors.username?.message}
                width="w-full"
              />
              {submitError && <p>{submitError.errorMessage}</p>}
              <Button
                name={loading ? "Loading..." : "Send instructions"}
                width="w-full"
                backgroundColor="bg-primary"
                color="text-white"
              />
            </form>
          </div>
        )}
      </section>
    </ClientLayout>
  );
};

export default ForgotPassword;
